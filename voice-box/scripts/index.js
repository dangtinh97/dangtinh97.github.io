import { Voice } from './voice.js'
import { Socket } from './socket.js'
let voice;
let socket;
document.addEventListener("DOMContentLoaded",()=>{
  let uidDevice = getUidDevice('uid-device');
  global.uid_device = uidDevice;
  $('#uid-device').html(uidDevice);
  voice = new Voice();
  socket = new Socket();
})
window.addEventListener(documentEvent.voice,({detail})=>{
  const {type, data} = detail;
  if(type===voiceEvents.content){
    $('.recognition').html(data.content)
    return socket.sendContent(data);
  }

  if(type===voiceEvents.time_wait_send){
    console.log(data);
  }
})
window.addEventListener(documentEvent.socket,({detail})=>{
  const {type, data} = detail;
  if(type===socketEvents.config){
    voice.socketChangeConfig(data)
  }
})
