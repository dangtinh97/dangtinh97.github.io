import { Voice } from './voice.js'
import { Socket } from './socket.js'
import {Audio} from './audio.js'

let voice;
let socket;
let audioOutput;
document.addEventListener("DOMContentLoaded",()=>{
  global.user_agent = (navigator.userAgent || navigator.vendor || window.opera).toLowerCase();
  $('.log #user-agent').html(global.user_agent);
  let uidDevice = getUidDevice('uid-device');
  global.uid_device = uidDevice;
  $('#uid-device').html(uidDevice);
  voice = new Voice();
  socket = new Socket();
  audioOutput = new Audio();

  $('#audio-start').on('click',(event)=>{
    $('#audio-start').remove()
  })
})
window.addEventListener(documentEvent.voice,({detail})=>{
  const {type, data} = detail;
  console.log(detail)
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

  if(type===socketEvents.message){
    console.log(data,'send_local')
    audioOutput.playAudio(data.result)
  }
})
