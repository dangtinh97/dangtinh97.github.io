async function getAudioInputDevices () {
  //Virtual checking
  const devices = await navigator.mediaDevices.enumerateDevices()
  console.log(devices)
  const audioDevices = devices.filter(device => device.kind === 'audioinput')
  let installed = false
  let isDefault = false
  audioDevices.forEach(device => {
    let name = device.label
    console.log(name)
    if (!installed && name.toLowerCase().includes('cabiz')) {
      installed = true
    }
    if (installed && !isDefault && device.deviceId === 'default') {
      isDefault = true
    }
  })
  return { installed, isDefault, audioDevices }
}

function generateUUID () {
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


function sendLocal (typeEvent, type, data = {}) {
  const event = new CustomEvent(typeEvent, {
    detail: {
      type, data
    }
  })
  window.dispatchEvent(event)
}
