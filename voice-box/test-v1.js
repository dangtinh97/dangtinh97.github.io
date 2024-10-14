document.addEventListener("DOMContentLoaded",()=>{
  let data = [
      '{"content":"Nếu","duration":1728300107880,"time":1728300107880}',
      '{"content":"Nếu Như","duration":510,"time":1728300108390}',
      '{"content":"nếu như chỉ","duration":87,"time":1728300108478}',
      '{"content":"nếu như chỉ được","duration":210,"time":1728300108687}',
      '{"content":"nếu như chỉ được dành","duration":192,"time":1728300108879}',
      '{"content":"nếu như chỉ được dành Duy","duration":192,"time":1728300109072}',
      '{"content":"nếu như chỉ được dành duy nhất","duration":8,"time":1728300109079}',
      '{"content":"nếu như chỉ được dành duy nhất một","duration":307,"time":1728300109386}',
      '{"content":"nếu như chỉ được dành duy nhất một lời","duration":392,"time":1728300109778}',
      '{"content":"nếu như chỉ được dành duy nhất một lời khuyên","duration":208,"time":1728300109987}',
      '{"content":"nếu như chỉ được dành duy nhất một lời khuyên đặc","duration":689,"time":1728300110675}',
      '{"content":"nếu như chỉ được dành duy nhất một lời khuyên đặc biệt","duration":8,"time":1728300110683}',
      '{"content":"nếu như chỉ được dành duy nhất một lời khuyên đặc biệt là","duration":293,"time":1728300110976}',
      '{"content":"nếu như chỉ được dành duy nhất một lời khuyên đặc biệt là những","duration":219,"time":1728300111195}',
      '{"content":"nếu như chỉ được dành duy nhất một lời khuyên đặc biệt là những bạn","duration":178,"time":1728300111373}',
      '{"content":"nếu như chỉ được dành duy nhất một lời khuyên đặc biệt là những bạn ở","duration":303,"time":1728300111676}',
      '{"content":"nếu như chỉ được dành duy nhất một lời khuyên đặc biệt là những bạn ở lứa","duration":110,"time":1728300111786}',
      '{"content":"nếu như chỉ được dành duy nhất một lời khuyên đặc biệt là những bạn ở lứa tuổi","duration":197,"time":1728300111984}',
      '{"content":"nếu như chỉ được dành duy nhất 1 lời khuyên đặc biệt là những bạn ở lứa tuổi 20","duration":395,"time":1728300112378}'
    ];
  const conversation2 = [
    '{"content":"nếu như chỉ được dành duy nhất một lời khuyên đặc biệt là những bạn ở lứa tuổi 20 đang","duration":822,"time":1728300113200}',
    '{"content":"nếu như chỉ được dành duy nhất một lời khuyên đặc biệt là những bạn ở lứa tuổi 20 đang mong","duration":196,"time":1728300113396}',
    '{"content":"nếu như chỉ được dành duy nhất một lời khuyên đặc biệt là những bạn ở lứa tuổi 20 đang mong chờ","duration":179,"time":1728300113575}',
    '{"content":"nếu như chỉ được dành duy nhất một lời khuyên đặc biệt là những bạn ở lứa tuổi 20 đang mong chờ một","duration":412,"time":1728300113987}',
    '{"content":"nếu như chỉ được dành duy nhất một lời khuyên đặc biệt là những bạn ở lứa tuổi 20 đang mong chờ một tương","duration":297,"time":1728300114284}',
    '{"content":"nếu như chỉ được dành duy nhất một lời khuyên đặc biệt là những bạn ở lứa tuổi 20 đang mong chờ một tương lai","duration":191,"time":1728300114475}',
    '{"content":"nếu như chỉ được dành duy nhất một lời khuyên đặc biệt là những bạn ở lứa tuổi 20 đang mong chờ một tương lai tươi","duration":314,"time":1728300114789}',
    '{"content":"nếu như chỉ được dành duy nhất một lời khuyên đặc biệt là những bạn ở lứa tuổi 20 đang mong chờ một tương lai tươi sáng","duration":86,"time":1728300114875}',
    '{"content":"nếu như chỉ được dành duy nhất một lời khuyên đặc biệt là những bạn ở lứa tuổi 20 đang mong chờ một tương lai tươi sáng khao","duration":910,"time":1728300115785}',
    '{"content":"nếu như chỉ được dành duy nhất một lời khuyên đặc biệt là những bạn ở lứa tuổi 20 đang mong chờ một tương lai tươi sáng khao kh","duration":104,"time":1728300115889}',
    '{"content":"nếu như chỉ được dành duy nhất một lời khuyên đặc biệt là những bạn ở lứa tuổi 20 đang mong chờ một tương lai tươi sáng khao khát","duration":98,"time":1728300115987}',
    '{"content":"nếu như chỉ được dành duy nhất một lời khuyên đặc biệt là những bạn ở lứa tuổi 20 đang mong chờ một tương lai tươi sáng khao khát để","duration":304,"time":1728300116291}',
    '{"content":"nếu như chỉ được dành duy nhất một lời khuyên đặc biệt là những bạn ở lứa tuổi 20 đang mong chờ một tương lai tươi sáng khao khát để có","duration":185,"time":1728300116476}',
    '{"content":"nếu như chỉ được dành duy nhất một lời khuyên đặc biệt là những bạn ở lứa tuổi 20 đang mong chờ một tương lai tươi sáng khao khát để có nhiều","duration":299,"time":1728300116775}',
    '{"content":"nếu như chỉ được dành duy nhất một lời khuyên đặc biệt là những bạn ở lứa tuổi 20 đang mong chờ một tương lai tươi sáng khao khát để có nhiều những","duration":299,"time":1728300117074}',
    '{"content":"nếu như chỉ được dành duy nhất một lời khuyên đặc biệt là những bạn ở lứa tuổi 20 đang mong chờ một tương lai tươi sáng khao khát để có nhiều những cái","duration":305,"time":1728300117379}',
    '{"content":"nếu như chỉ được dành duy nhất một lời khuyên đặc biệt là những bạn ở lứa tuổi 20 đang mong chờ một tương lai tươi sáng khao khát để có nhiều những cái Lựa","duration":99,"time":1728300117478}',
    '{"content":"nếu như chỉ được dành duy nhất một lời khuyên đặc biệt là những bạn ở lứa tuổi 20 đang mong chờ một tương lai tươi sáng khao khát để có nhiều những cái lựa chọn","duration":195,"time":1728300117673}',
    '{"content":"nếu như chỉ được dành duy nhất một lời khuyên đặc biệt là những bạn ở lứa tuổi 20 đang mong chờ một tương lai tươi sáng khao khát để có nhiều những cái lựa chọn đến","duration":423,"time":1728300118096}'
  ];

  const processData = (data)=>{
    data = data.map((item)=>{
      return JSON.parse(item)
    })
    data.sort((a, b) => a.time - b.time);
    return data;
    // Create a map to store the unique content with the smallest time
    const uniqueContentMap = new Map();

    data.forEach(item => {
      if (!uniqueContentMap.has(item.content) || uniqueContentMap.get(item.content).time > item.time) {
        uniqueContentMap.set(item.content, item);
      }
    });
    return Array.from(uniqueContentMap.values());
  }

  const curlAddPunctuation =async (text)=>{
    return new Promise((resolve, reject)=>{
      $.ajax('https://text-processing.dev.cabiz.ai/api/completion/',{
        type:"POST",
        dataType:"JSON",
        data: {
          message: text,
        },
        success:(res)=>{
          return resolve(res.result)
        }
      })
    })
  }
  const data1 = processData(data);
  const data2 = processData(conversation2);

  async function getLog(){
    const logs = await fileToJson('log.json')
    console.log(logs);
  }

  $('#test').on('click',async ()=>{
    // let message = await getMessage();
    // return processWithDuration(message,'hôm nay trời đẹp, đi chơi, không đi đâu.')
    // return getLog();
    // return tryAgainTheWrongSentence('bạn nuối tiếc và bạn cảm thấy rằng việc rời đi nó rất là khó, khăn, thì có thể đây sẽ là sportcut dành cho bạn.');
    return tryAgainTheWrongSentence('từ bỏ những thứ không còn thuộc về mình và bắt đầu một chương mới, một cuộc sống mới, một bản thân bạn mới, hơn, tốt hơn và, nếu như ở trong,');

    return getLog();
    const logs = (await fileToJson('message-short.json')).map(item=>JSON.stringify(item))
    const data2 = processData(logs);
    const lastM = detectLastMessage(data2)
    console.log(lastM);
    // console.log(logs)
    return;


    const textNeedProcess = 'những môn học mới và còn kha khá điều nữa mà san sẽ chia sẻ cho các bạn trong thời gian tới ngày hôm nay';
    const data =await dataJson();

    let last = '';
    const dataPr = [];
    for(let i=0;i<data.length; i++){
      let words = data[i].content.split(' ')
      if(last==''){
        last = words[words.length-1]
        dataPr.push({
          duration: data[i].duration,
          text: last,
        })
        continue;
      }
      const wordLast = last.split(' ')
      const  p = words.lastIndexOf(wordLast[wordLast.length - 1])
      const f = words.slice(p+1);
      last = f.join(' ');
      dataPr.push({
        duration: data[i].duration,
        text: last,
      })
    }
    console.log(dataPr);


    return;
    console.log(data);
    let totalPoint = 0;
    let listM = [];
    const totalDuration = data.forEach(item=>{
      totalPoint += item.duration
      const c = item.content.split(' ')
      listM.push({
        time: item.duration,
        text: c[c.length-1]
      })
    })
    console.log(totalPoint / data.length);
    console.log(listM);
    // const lastMessage = detectLastMessage(data1);
    // curlToService(lastMessage).then(async (res)=>{
    //   const lastMessage = detectLastMessage(data2);
    //   console.log(lastMessage);
    //   const sp = splitAddPunctuation(res)
    //   const lastMessage2 = lastMessage.slice(lastMessage.indexOf(sp[1]));
    //   const dataM = await curlToService(lastMessage2);
    //   console.log(dataM);
    //   console.log(sp);
    // })
  })

  const processWithDuration = (arr, text)=>{
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      const current = arr[i];
      if(i===0){
        result.push({
          text: current.content,
          duration: 0,
        })
        continue;
      }
      const prev = arr[i - 1];
      const contentCurrent = current.content;
      const contentPrev = prev.content;
      const c = getSimilarityPercentage(contentCurrent,contentPrev);
      if(c<50){
        result.push({
          text: current.content,
          duration: current.duration,
        })
        continue;
      }
      const spC = contentCurrent.split(' ');
      const spPrev = contentPrev.split(' ');
      const contentNew = spC.slice(spPrev.length).join(' ')
      result.push({
        text: contentNew,
        duration: current.duration,
      })
    }
    const spText = splitAddPunctuation(text)
    if(text<3){
      return text;
    }
    const textNotProcess = spText.slice(0,spText.length - 2).map(item=> item.text).join(' ').split(' ');
    const clone = result.slice(textNotProcess.length);
    let textCompleted = spText.slice(0,spText.length - 2).map(item=>{
      return `${item.text}${item.punctuation}`
    }).join(" ")
    return `${textCompleted} ${sentences(clone)}`;
  }

  const sentences = (data)=>{
    const threshold = 300; // Ngưỡng duration để ngắt câu
    let sentences = [];
    let currentSentence = "";
    data.forEach((word, index) => {
      currentSentence += word.text + " "; // Thêm từ vào câu hiện tại

      // Kiểm tra khoảng cách duration của từ hiện tại với từ tiếp theo
      if (index < data.length - 1 && data[index + 1].duration > threshold) {
        sentences.push(currentSentence.trim()); // Đẩy câu hiện tại vào mảng kết quả
        currentSentence = ""; // Tạo câu mới
      }
    });

// Thêm câu cuối cùng nếu còn nội dung
    if (currentSentence.trim()) {
      sentences.push(currentSentence.trim());
    }
    return sentences.join(", ")+".";
  }

  const getMessage =async ()=>{
    const json =await fileToJson('message.json');
    console.log(json);
    return json;
  }

  const dataJson = ()=>{
    let data = [];
    return new Promise((resolve, reject)=>{

      $.ajax('./message.json',{
        method:"GET",
        dataType:"JSON",
        success: (res)=>{
          return resolve(res);
          data = res.map(item=>{
            return JSON.parse(item.value)
          })
          resolve(data);
        }
      })
    })
  }

  const detectLastMessage = (data)=>{
    let lastMessage = '';
    let conversations = [];
    let positionError = 0;
    for(let i=0;i< data.length; i++){
      if(i>=data.length-1){
        continue;
      }
      const c = getSimilarityPercentage(data[i+1]['content'].toLowerCase(), data[i]['content'].toLowerCase());
      console.log(c);
      if(c>50){
        lastMessage = data[i+1]
        conversations[positionError] = lastMessage;
      }else {
        positionError++;
        conversations.push(data[i]);
      }
    }
    return conversations.map((item)=> item.content).join(' ');
  }

  const splitAddPunctuation = (text)=>{
    const sp = text.split('')
    if(!',.!?-'.includes(sp[sp.length-1])){
      text = `${text}.`
    }
    const segments = [];
    const regex = /([^,.!?-]+)([,.!?-]+)/g;

    let match;
    while ((match = regex.exec(text)) !== null) {
      segments.push({
        text: match[1].trim(),
        punctuation: match[2].trim(),
      });
    }

    return segments;
  }

  const tryAgainTheWrongSentence =async (text)=>{
    const spOrigin = splitAddPunctuation(text);
    console.log(spOrigin);
    let textError = '';
    let wordAfterErrors = [];
    spOrigin.forEach((item, index)=>{
      const words = item['text'].split(' ');
      if(words.length!==1){
        return;
      }
      if(index<=0 || index===spOrigin.length-1){
        return;
      }
      let before = spOrigin[index-1];
      let after = spOrigin[index+1];
      wordAfterErrors.push({
        index: index,
        word: item.text,
        updated: false,
        before,
        after,
        concat: index+2 < spOrigin.length ? after['text']: after['text'].split(' ')[0]
      })
    })
    if(wordAfterErrors.length===0){
      return text;
    }
    for(let i=0;i< wordAfterErrors.length; i++){
      let before = wordAfterErrors[i]['before'];
      let concat = wordAfterErrors[i]['concat'];
      let word = wordAfterErrors[i]['word'];
      let textProcess = `${before['text']} ${word} ${concat}`
      console.log(textProcess);
      const textNew = await curlAddPunctuation(textProcess);
      const spNew = splitAddPunctuation(textNew);
      console.log(spNew, textNew);
      if(spNew.length!==2){
        continue;
      }
      spOrigin[wordAfterErrors[i]['index'] - 1]['punctuation'] = '';
    }

    let result = '';
    spOrigin.forEach((item)=>{
      result += `${item.text}${item.punctuation} `
    })
    console.log(result);
    return result.trim()
  }

  function getSimilarityPercentage(string1, string2) {
    // Tách các chuỗi thành mảng các từ
    const words1 = string1.split(" ");
    const words2 = string2.split(" ");

    // Lấy số lượng từ ngắn hơn để so sánh
    const minLength = Math.min(words1.length, words2.length);
    let matchCount = 0;

    // So sánh từng từ theo vị trí
    for (let i = 0; i < minLength; i++) {
      if (words1[i] === words2[i]) {
        matchCount++;
      }
    }

    // Tính tỷ lệ phần trăm trùng khớp dựa trên số lượng từ
    const similarityPercentage = (matchCount / minLength) * 100;

    return Number(similarityPercentage.toFixed(2)); // Trả về tỷ lệ phần trăm với 2 chữ số thập phân

  }

})
