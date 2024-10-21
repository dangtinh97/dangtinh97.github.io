export class Voice {
  isStart = false
  recognition = null
  lang = null
  configBox = {}
  transcript = null
  waitStop = null
  message_before_stop = ''
  tmp = ''
  timestampVoice = {
    start: 0,
    end: 0,
    send_last: 0,
  }

  constructor () {
    this.setup()
  }

  setup () {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('NOT SUPPORT!')
      return
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

  onStart (event) {
    console.log('start', event)
    $('.log > #microphone').html('Recording...')
    $('#audioPlayer').show()
    this.timestampVoice = {
      ...this.timestampVoice,
      start: event.timeStamp
    }
  }

  onEnd (event) {
    $('#audioPlayer').hide()
    this.tmp = ''
    this.transcript = ''
    console.log('end', event)
    if (global.auto_restart) {
      this.startVoice()
    }
    this.timestampVoice = {
      ...this.timestampVoice,
      end: event.timeStamp
    }
  }

  onError (event) {
    $('#audioPlayer').hide()
    this.tmp = ''
    this.transcript = ''
    console.log('microphone - error', event.error)
    $('.log > #microphone').html(event.error)
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
    this.sendLocal(voiceEvents.content,
      {
        content: newTranscript,
        duration: event.timeStamp,
        is_final: isFinals.indexOf(true) !== -1
      })
    if (this.waitStop != null) {
      clearTimeout(this.waitStop)
    }
    this.waitStop = setTimeout(() => {
      this.sendLocal(voiceEvents.time_wait_send, this.timestampVoice)
      this.message_before_stop = this.tmp
    }, TIME_WAIT_SEND)
  }

  setLang (lang) {
    if (this.lang === lang) {
      return
    }
    this.lang = lang
    this.recognition.lang = lang
    this.stopVoice()
  }

  sendLocal (type, data = {}) {
    const event = new CustomEvent(documentEvent.voice, {
      detail: {
        type, data
      }
    })
    window.dispatchEvent(event)
  }

  socketChangeConfig (data) {
    this.configBox = data
    if (data.input !== statusInputVoice.on) {
      return this.stopVoice()
    }
    this.setLang(data.input_language.code_global.replace('_', '-'))
    setTimeout(() => {
      this.startVoice()
    }, 10)
  }

  stopVoice () {
    if (this.isStart) {
      this.recognition.stop()
    }
  }

  startVoice () {
    console.log(global.page)
    if (!this.isStart && this.configBox.input === statusInputVoice.on && global.page !== 'OUTPUT') {
      this.recognition.start()
    }
  }
}
