export class SpeechRecognitionModule {
  isStart = false
  errorHasRestart = ['no-speech', 'abort']

  constructor () {
    this.setup()
  }

  setup () {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      return alert('System not support SpeechRecognition!')
    }
    const recognition = new SpeechRecognition()
    recognition.continuous = true // Recognize speech in a single run
    recognition.interimResults = true // Only return final results'
    recognition.maxAlternatives = 1 // Only return final results'
    this.recognition = recognition
    recognition.onend = this.onEnd.bind(this)
    recognition.onerror = this.onError.bind(this)
    recognition.onstart = this.onStart.bind(this)
    recognition.onresult = this.onResult.bind(this)
  }

  changeLangInput (lang) {
    this.recognition.lang = lang
  }

  onStart (event) {
    this.isStart = true
    // console.log('start', event)
    // $('.log > #microphone').html('Recording...')
    // $('#audioPlayer').show()
    // this.timestampVoice = {
    //   ...this.timestampVoice,
    //   start: event.timeStamp
    // }
  }

  onEnd () {
    this.isStart = false
  }

  onError (event) {
    this.isStart = false
    $.toast(`onError: ${event.error}`)
    console.log(event.error)
    // $('#audioPlayer').hide()
    // this.tmp = ''
    // this.transcript = ''
    // console.log('microphone - error', event.error)
    // $('.log > #microphone').html(event.error)
  }

  onResult (event) {
    let newTranscript = ''
    let transcript = ''
    let isFinals = []
    this.timestampVoice = {
      ...this.timestampVoice,
      send_last: event.timeStamp
    }
    for (let i = 0; i < event.results.length; i++) {
      isFinals.push(event.results[i].isFinal)
      transcript += (event.results[i][0].transcript).trim() + ' '
    }
    transcript = transcript.toLowerCase().trim()
    newTranscript = transcript
    if (global.user_agent.includes('android')) {
      newTranscript = transcript.replace(this.transcript, '').trim()
    }
    if (this.transcript === transcript || newTranscript === this.tmp || newTranscript.trim() === '') {
      return
    }
    this.tmp = newTranscript
    this.transcript = transcript
    $('.onResult > .content-realtime').html(newTranscript)
    // this.sendLocal(voiceEvents.content,
    //   {
    //     content: newTranscript,
    //     duration: event.timeStamp,
    //     is_final: isFinals.indexOf(true) !== -1
    //   })
    if (this.waitStop != null) {
      clearTimeout(this.waitStop)
    }
    this.waitStop = setTimeout(() => {
      this.recognition.abort()
      //this.sendLocal(voiceEvents.time_wait_send, this.timestampVoice)
      this.message_before_stop = this.tmp
    }, TIME_WAIT_SEND)
  }

  startRec () {
    if (this.isStart) {
      return
    }
    this.recognition.start()
  }

  stopRec () {
    this.recognition.stop()
  }
}
