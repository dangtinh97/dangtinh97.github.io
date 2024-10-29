let socket;
import { Socket } from './socket.js'
document.addEventListener("DOMContentLoaded",()=>{
  let session = generateUUID()
  window.localStorage.setItem('session',session)
  socket = new Socket(session)

  navigator.mediaDevices.ondevicechange = function (){
    getAudioInputDevices().then(r=>checkingVirtual(r));
  }
  getAudioInputDevices().then(r=>checkingVirtual(r));
})

const checkingVirtual = ({ installed, isDefault, audioDevices }) => {
  modalHide()
  console.log(installed, isDefault, audioDevices)
  if (!installed) {
    showModal(MODAL_DATA.virtual, 'Please install Cabiz.AI Virtual to use this website.')
    return false
  }

  if (!isDefault) {
    showModal(MODAL_DATA.virtual, 'Please select Cabiz.AI Virtual as the default sound input for the system.')
    return false
  }
  socket.connect()
  return true
}
