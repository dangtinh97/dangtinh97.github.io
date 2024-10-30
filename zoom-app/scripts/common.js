async function getAudioInputDevices () {
  //Virtual checking
  const devices = await navigator.mediaDevices.enumerateDevices()
  const audioDevices = devices.filter(device => device.kind === 'audioinput')
  let installed = false
  let isDefault = false
  audioDevices.forEach(device => {
    let name = device.label
    if (!installed && name.toLowerCase().includes('cabiz')) {
      installed = true
    }
    if (installed && !isDefault && device.deviceId === 'default') {
      isDefault = true
    }
  })
  return { installed, isDefault, audioDevices }
}

function generateUUID () { // Public Domain/MIT
  var d = new Date().getTime()//Timestamp
  var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0//Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16//random number between 0 and 16
    if (d > 0) {//Use timestamp until depleted
      r = (d + r) % 16 | 0
      d = Math.floor(d / 16)
    } else {//Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0
      d2 = Math.floor(d2 / 16)
    }
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}

function showToast(text){
  $.toast({
    position:'top-left',
    text: text
  })
}


function sendLocal (typeEvent, type, data = {}) {
  const event = new CustomEvent(typeEvent, {
    detail: {
      type, data
    }
  })
  window.dispatchEvent(event)
}


function getSimilarityPercentage(string1, string2) {
  // Tách các chuỗi thành mảng các từ
  const words1 = string1.split(' ');
  const words2 = string2.split(' ');

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
