import { SocketModule } from './socket.js'
import { SpeechRecognitionModule } from './speech-recognition.js'

let SpeechRecognition
let socket
document.addEventListener('DOMContentLoaded', () => {
  global.user_agent = (navigator.userAgent || navigator.vendor || window.opera).toLowerCase()
  socket = new SocketModule()
  SpeechRecognition = new SpeechRecognitionModule()

  $('#connect').on('click', () => {
    let roomId = $('#room-id').val().trim()
    if (roomId !== '') {
      socket.connect(roomId)
    }
  })
  const image = document.getElementById('circleImage')
  image.addEventListener('click', function (e) {

  })
  $('#circleImage').on('touchstart', () => {
    socket.statusMicrophone(true)
    global.is_hold = true
    addAnimation()
    SpeechRecognition.startRec()
  }).on('touchend', () => {
    socket.statusMicrophone(false)
    $('.ripple').remove()
    global.is_hold = false
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

  $('#circleImage').on('click', () => {
    SpeechRecognition.startRec()
  })
})

window.addEventListener(documentEvent.audioConfig, (event) => {
  const { type, data } = event.detail
  let btnRec = $('.btn-rec')
  let tutorial = $('.tutorial-rec')
  if (type === 'audio-input' && data.audioInput) {
    SpeechRecognition.changeLangInput(data.audioInput)
  }
  if(!data.audioInput || !data.audioOutput || !data.zoomOutput){
    btnRec.hide()
    tutorial.css('display', 'none')
    return;
  }
  socket.sendConfig(data)
  btnRec.show()
  tutorial.css('display', 'flex')
})


window.addEventListener(documentEvent.voice,(event)=>{
  const { type, data } = event.detail
  console.table([data])
})
