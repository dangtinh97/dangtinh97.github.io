let socket;
import { Socket } from './socket.js'
import {SpeechSynthesis} from './speech-synthesis.js'
let speechSynthesis =new SpeechSynthesis()
document.addEventListener("DOMContentLoaded",()=>{
  let session = generateUUID()
  window.localStorage.setItem('session',session)
  socket = new Socket(session)
  navigator.mediaDevices.ondevicechange = function (){
    getAudioInputDevices().then(r=>checkingVirtual(r));
  }
  getAudioInputDevices().then(r=>checkingVirtual(r));

  $('#playa').on('click',()=>{
    speechSynthesis.playAudio('しかし、過去79年間、事務総長と大統領は数週間、ホー・チ・ミン大統領に感謝していませんでした。グエン・フー・チョン書記長の前進や、英雄や殉教者への賛辞などが盛り込まれています。','ja-JP')
  })
})

const checkingVirtual = ({ installed, isDefault, audioDevices }) => {
  modalHide()
  console.log(installed, isDefault, audioDevices)
  if (!installed) {
    // showModal(MODAL_DATA.virtual, 'Vui lòng cài đặt Cabiz.AI Virtual để sử dụng trang web này.')
    return false
  }

  if (!isDefault) {
    showModal(MODAL_DATA.virtual, 'Vui lòng chọn Cabiz.AI Virtual làm thiết bị đầu vào âm thanh mặc định cho hệ thống.')
    return false
  }
  socket.connect()
  return true
}

window.addEventListener(documentEvent.audio,(event)=>{
  const { type, data } = event.detail;
  console.log(event.detail)
  speechSynthesis.playAudio(data.result, data.code_global)
})
