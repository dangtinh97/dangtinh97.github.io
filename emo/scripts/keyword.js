import {langDefault} from './config.js'

export const question = {
  hello: {
    en: ['hello', 'hi'],
    vi: ['xin chào']
  },
  what_is_your_name: {
    en: 'what is your name',
    vi: 'tên của bạn là gì'
  },
  time: {
    en: ['what time is it', 'could you tell me the time please', 'do you happen to have the time', 'do you know what time it is','time now'],
    vi: ['bây giờ là mấy giờ', 'bạn có thể xem giúp tôi mấy giờ rồi được không', 'bạn có biết mấy giờ rồi không', 'bạn có biết mấy giờ rồi không']
  }
}

export const answer = {
  'no_answer':{
    en:'I don\'t understand your question',
    vi:'Tôi không hiểu câu hỏi của bạn'
  },
  'time':{
    en:'time now',
    vi:'bay gio la'
  },
  'what_is_your_name':{
    'en':'I am robot vector',
    'vi':'Tôi là robot vector '
  },
  hello:{
    'en':'Hello, can i help you',
    'vi':'Xin chào, tôi có thể giúp gì cho bạn?'
  }
}

export const getAllValues = (obj) => {
  let values = []
  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      values = values.concat(getAllValues(obj[key]))
    } else {
      values.push(obj[key])
    }
  }

  return values

}
export const findKeyByValue = (obj, value) => {
  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      const result = findKeyByValue(obj[key], value)
      if (result) {
        return key + '.' + result
      }
    } else if (Array.isArray(obj[key])) {
      if (obj[key].includes(value)) {
        return key
      }
    } else if (obj[key] === value) {
      return key
    }
  }
  return ''
}

export const detect = (obj,value)=>{
  try{
    const detectData = findKeyByValue(obj,value).split('.');
    console.log(detectData);
    if(detectData.length===0){
      return {
        voice: answer['no_answer'][langDefault],
        key: 'no_answer'
      }
    }

    return {
      voice: answer[detectData[0]][langDefault] || answer['no_answer'][langDefault],
      key: detectData[0] || 'no_answer'
    }
  }catch (e) {
    console.error(e)
    return {
      voice: answer['no_answer'][langDefault],
      key: 'no_answer'
    }
  }

}
