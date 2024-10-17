import { Voice } from './voice.js'
import { Socket } from './socket.js'
// import {Audio} from './audio.js'

let voice;
let socket;
let audio;
document.addEventListener("DOMContentLoaded",()=>{
  let uidDevice = getUidDevice('uid-device');
  global.uid_device = uidDevice;
  $('#uid-device').html(uidDevice);
  voice = new Voice();
  socket = new Socket();
  // audio = new Audio();
})
window.addEventListener(documentEvent.voice,({detail})=>{
  const {type, data} = detail;
  if(type===voiceEvents.content){
    $('.recognition').html(data.content)
    return socket.sendContent({
      ...data,
      time: new Date().getTime()
    });
  }
  if(type===voiceEvents.time_wait_send){
    socket.voiceStop(data);
  }
})
window.addEventListener(documentEvent.socket,({detail})=>{
  const {type, data} = detail;
  if(type===socketEvents.config){
    voice.socketChangeConfig(data)
  }
})
