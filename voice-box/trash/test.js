document.addEventListener("DOMContentLoaded",()=>{
  let messages = [];
  let logs = [];
  Promise.all([
    fileToJson('message.json').then((res) => {
      console.info(res);
      messages = res
      messages.sort((a, b) => a.time - b.time);
    }),
    fileToJson('log.json').then((res) => {
      console.info(res);
      logs = res
    })
  ]).then( r =>{

  })
  let step = 0;
  $('#test').on('click',()=>{
    if(step===0){
      window.localStorage.removeItem(KEY_LAST_MESSAGE)
    }
    run(step).then(r => {
      step++;
    });
  })

  const run =async (step)=>{
    console.info("===>")
    const dataStep = logs[step];
    const dataMessage = findMessage(dataStep.from, dataStep.to, messages);
    let lastMessage = messageFromArray(dataMessage);
    const messageProcessLast = getLastMessage();
    if(messageProcessLast){
      const secondary = messageProcessLast.with_dot.secondary;
      const messagePending = secondary.map((item)=>item.text).join(' ')
      lastMessage = lastMessage.slice(lastMessage.indexOf(messagePending))
    }
    $('.input > pre').append(lastMessage + '')
    console.log('lastMessage===>',lastMessage)
    const textAddPunctuation = await curlAddPunctuation(lastMessage);
    console.log('textAddPunctuation===>',textAddPunctuation)
    const spAddPunctuation = splitAddPunctuation(textAddPunctuation);
    console.log('spAddPunctuation===>',spAddPunctuation);
    const detectDotLast = detectMessageWithDot(spAddPunctuation);
    console.log('detectDotLast===>',detectDotLast);
    setLastMessage({
      from: dataStep.from,
      to: dataStep.to,
      last_message: lastMessage,
      punctuation: spAddPunctuation,
      with_dot: detectDotLast
    })
    if(detectDotLast.primary.length===0){
      return;
    }
    $('.output > #message-sync').append(`<li>${joinMessageFromPunctuation(detectDotLast.primary)}</li>`)
  }
})
