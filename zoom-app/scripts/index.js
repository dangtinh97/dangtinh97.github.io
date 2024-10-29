import { SocketModule } from './socket.js'
import { SpeechRecognitionModule } from './speech-recognition.js'

let SpeechRecognition
let Socket
document.addEventListener('DOMContentLoaded', () => {
  global.user_agent = (navigator.userAgent || navigator.vendor || window.opera).toLowerCase();
  Socket = new SocketModule()
  SpeechRecognition = new SpeechRecognitionModule()

  $('#connect').on('click', () => {
    let roomId = $('#room-id').val().trim()
    if (roomId !== '') {
      socket.joinRoom(roomId)
    }
  })
  const image = document.getElementById('circleImage')
  image.addEventListener('click', function (e) {

  })
  $('#circleImage').on('touchstart', () => {
    global.is_hold = true;
    addAnimation()
    SpeechRecognition.startRec()
  }).on('touchend', () => {
    $('.ripple').remove()
    global.is_hold = false;
    SpeechRecognition.stopRec()
  })

  function addAnimation () {
    let find = $('.btn-rec').find('.ripple')
    if (find.length !== 0) {
      return
    }
    const ripple = document.createElement('span')
    ripple.classList.add('ripple')
    image.parentElement.appendChild(ripple)
    ripple.addEventListener('animationend', () => {
      ripple.remove()
    })
  }

  $('#audio-input').on('change', (event) => {
    let value = event.currentTarget.value
    let btnRec = $('.btn-rec')
    value === '' ? btnRec.hide() : btnRec.show()
    if (value === '') {
      return
    }
    SpeechRecognition.changeLangInput(value)
  })

  $('#circleImage').on('click',()=>{
    SpeechRecognition.startRec()
  })
})
