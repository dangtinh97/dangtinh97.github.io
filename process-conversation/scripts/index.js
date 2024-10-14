document.addEventListener('DOMContentLoaded', () => {
  const KEY_STEP = 'step'
  const startBtn = $('#start')
  const nextStepBtn = $('#next-step')
  const resetBtn = $('#reset')
  let messages = []
  let logs = []
  let getFileCount = 0
  let step = Number(window.localStorage.getItem(KEY_STEP) || '0')
  fileToData('audio-message.json').then((res) => {
    getFileCount++
    messages = res
  })
  startBtn.hide()
  fileToData('audio-log.json').then((res) => {
    getFileCount++
    logs = res
  })

  let loadedFile = setInterval(() => {
    if (getFileCount === 2) {
      $('#start').show()
      return clearInterval(loadedFile)
    }
  }, 100)

  startBtn.on('click', () => {

  })

  resetBtn.on('click', () => {
    window.localStorage.removeItem(KEY_STEP)
    window.localStorage.removeItem(KEY_LAST_MESSAGE)
    $('#history > tbody').html('')
  })

  nextStepBtn.on('click', () => {
    if (step >= logs.length) {
      return alert('Step not found!')
    }
    nextStepBtn.attr('disabled', true)
    const dataLog = logs[step]
    const from = dataLog.from
    const to = dataLog.to
    let dataNeedProcess = findData(from, to)
    const lastProcess = getLastMessage()
    if (lastProcess) {
      const dataRemaining = lastProcess.data_remaining
      dataNeedProcess = dataRemaining.concat(dataNeedProcess)
      let times = [];
      dataNeedProcess = dataNeedProcess.filter((item)=>{
        const process= times.indexOf(item.time)===-1;
        times.push(item.time);
        return process;
      })
    }
    console.log({dataNeedProcess})
    processData(dataNeedProcess).then(() => {
      step++
      window.localStorage.setItem(KEY_STEP, step)
      nextStepBtn.attr('disabled', false)
      $('html,body').animate({scrollTop: document.body.scrollHeight},"fast");
    })
  })

  function lastWordAndDuration (res){
    const lastAndDuration = res.map((item)=>{
      const textSp = item.content.split(' ');
      return {
        text_last: textSp[textSp.length - 1],
        duration: item.duration
      }
    })
    return lastAndDuration;
  }

  async function processData (data) {
    let lastMessage = messageFromArray(data)
    lastMessage = removeMessageDuplicate(lastMessage)
    let textAddPun = await curlAddPunctuation(lastMessage)
    const resultPredict = predict(textAddPun)
    let resultLastWordAndDuration = lastWordAndDuration(data)
    textAddPun = getMessage(resultPredict, resultLastWordAndDuration);
    let spFromTextAddPun = splitAddPunctuation(textAddPun)
    let textRemaining = spFromTextAddPun[spFromTextAddPun.length - 1]['text']

    const pos = textAddPun.lastIndexOf(textRemaining);
    const dataRemaining = findTimeFromMessage(textRemaining, data)
    setLastMessage({
      text: lastMessage,
      text_add_pun: textAddPun,
      split_text_add_pun: spFromTextAddPun,
      data_remaining: dataRemaining,
    })
    $('#history > tbody').append(`<tr>
      <td>${lastMessage}</td>
      <td>${textAddPun}</td>
      <td>${textRemaining}</td>
        </tr>`)

    $('#history > tbody').append(`<tr><td colspan="3" class="text-center text-danger">${textAddPun.slice(0, pos)}</td>}</td>></tr>`)
  }

  const predict = (text)=>{
    const words = text.match(/([^\s.,!?]+|[.,!?])/gu);
    const result = [];
    for (let i = 0; i < words.length; i++) {
      // Nếu từ tiếp theo là dấu câu, thêm dấu câu vào từ hiện tại
      if (/[.,!?]/.test(words[i + 1])) {
        result.push({ text: words[i], punctuation: words[i + 1] });
        i++; // Bỏ qua dấu câu đã được xử lý
      } else {
        result.push({ text: words[i], punctuation: "" });
      }
    }
    return result;
  }

  function getMessage(predict, wordDuration){
    console.log({predict, wordDuration})
    let process = predict;
    let setPos = -1;
    for (let i=0; i< wordDuration.length;i++){
      let itemPredict = process[i];
      let itemWordDuration = wordDuration[i];
      if(itemPredict.punctuation!==''){
        try{
          if(wordDuration[i+2].duration > wordDuration[i+1].duration && setPos===-1){
            process[i+1]['punctuation'] = process[i]['punctuation']
            process[i]['punctuation'] = ''
            setPos = i+2;
          }
        }catch (e) {

        }

      }
    }
    return process.map((item)=>{
      return `${item.text}${item.punctuation}`
    }).join(' ')
    // predict.forEach((item)=>{
    //   if(item.punctuation===''){
    //     return item;
    //   }
    // })
  }

  function removeMessageDuplicate(content){
    let dataEnd = getLastMessage();
    if(!dataEnd){
      return content;
    }
    const splitTextAddPun = dataEnd.split_text_add_pun;
    const messageNeedRemove = splitTextAddPun[splitTextAddPun.length-1]['text'];
    const pos = content.lastIndexOf(messageNeedRemove);
    return content.slice(pos);
  }

  function findTimeFromMessage (text, data) {
    const spText = text.split(' ')
    let result = []
    for (let i = 1; i <= spText.length; i++) {
      result.push(data[data.length - i])
    }
    return result.reverse()
  }

  resetBtn.on('click', () => {
    step = 0
  })

  function findData (start, end) {
    let findStart = false
    let findEnd = false
    let result = []
    messages.forEach((item) => {
      if (findEnd) {
        return
      }
      if (item.time === start) {
        findStart = true
      }
      if (findStart) {
        result.push(item)
      }
      if (item.time === end) {
        findEnd = true
      }
    })
    result.sort((a, b) => a.time - b.time)
    return result
  }

})
