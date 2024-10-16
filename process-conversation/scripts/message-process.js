const PERCENTAGE = 50
const KEY_LAST_MESSAGE = 'LAST_MESSAGE';
const messageFromArray = (data) => {
  let lastMessage = '';
  const conversations = []
  let positionError = 0
  for (let i = 0; i < data.length; i++) {
    if (i >= data.length - 1) {
      continue
    }
    const c = getSimilarityPercentage(
      data[i + 1]['content'].toLowerCase(),
      data[i]['content'].toLowerCase(),
    )
    if (c > PERCENTAGE) {
      lastMessage = data[i + 1]
      conversations[positionError] = lastMessage
    } else {
      positionError++
      conversations.push(data[i])
    }
  }
  return conversations.map((item) => item.content).join(' ')
}
const getSimilarityPercentage = (string1, string2) => {
  const words1 = string1.split(' ')
  const words2 = string2.split(' ')
  const minLength = Math.min(words1.length, words2.length)
  let matchCount = 0
  for (let i = 0; i < minLength; i++) {
    if (words1[i] === words2[i]) {
      matchCount++
    }
  }
  // Tính tỷ lệ phần trăm trùng khớp dựa trên số lượng từ
  const similarityPercentage = (matchCount / minLength) * 100
  return Number(similarityPercentage.toFixed(2)) // Trả về tỷ lệ phần trăm với 2 chữ số thập phân
}
const findMessage = (from, to, messages)=>{
  const result = [];
  let hasFrom = false;
  let hasEnd = false;
  messages.forEach((item)=>{
    if(hasEnd){
      return;
    }
    if(item.time === from){
      hasFrom = true;
    }
    if(item.time === to){
      hasEnd = true;
    }
    result.push(item);
  })
  return result;
}
const curlAddPunctuation =async (text)=>{
  return new Promise((resolve, reject)=>{
    $.ajax('https://text-processing.dev.cabiz.ai/api/punctuation/',{
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

  segments[segments.length-1] = {
    text: segments[segments.length-1].text,
    punctuation:''
  }

  return segments;
}

const setLastMessage = (data)=>{
  window.localStorage.setItem(KEY_LAST_MESSAGE, JSON.stringify(data))
}

const getLastMessage = ()=>{
  let data = window.localStorage.getItem(KEY_LAST_MESSAGE)
  if(!data){
    return null;
  }
  return JSON.parse(data);
}

const detectMessageWithDot=(data)=>{
  let posDotLast = -1;
  data.forEach((item, index)=>{
    console.log('.?'.includes(item.punctuation), item.punctuation, item)
    if(('.?'.includes(item.punctuation) || item.text.split(' ').length>5) && item.punctuation!==''){
      posDotLast = index;
    }
  })
  console.log(posDotLast);

  return {
    primary: posDotLast>-1 ? data.slice(0,posDotLast+1) : [],
    secondary: posDotLast >-1 ? data.slice(posDotLast+1) : data,
  }
}

const joinMessageFromPunctuation = (data)=>{
  return data.map((item)=>{
    return item.text+ item.punctuation;
  }).join(' ');
}
