async function getAudioInputDevices() {
  //Virtual checking
  const devices = await navigator.mediaDevices.enumerateDevices();
  const audioDevices = devices.filter(device => device.kind === 'audioinput');
  let installed = false;
  let isDefault = false;
  audioDevices.forEach(device => {
    let name = device.label;
    if(!installed && name.toLowerCase().includes('cabiz')){
      installed = true;
    }
    if(installed && !isDefault && device.deviceId==='default'){
      isDefault = true;
    }
  });
  return {installed, isDefault, audioDevices}
}
