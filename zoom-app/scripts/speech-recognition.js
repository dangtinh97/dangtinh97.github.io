export class SpeechRecognitionModule {
  isStart = false
  errorHasRestart = ['no-speech', 'abort']
  errorEnd = ''
  timeoutStopAudio = null
  timeoutRealTimeAudio = null
  isWaitingSendRealtime = false
  transcript = ''
  dataRec = {
    send: [],
    contents: [],
    id_process: 1,
  }

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
    if (!global.is_hold) {
      return false
    }
    this.startRec()
  }

  onError (event) {
    this.errorEnd = event.error.trim()
    this.isStart = false
  }

  onResult (event) {
    let transcript = ''
    for (let i = 0; i < event.results.length; i++) {
      transcript += (event.results[i][0].transcript).trim() + ' '
    }
    if (global.user_agent.includes('android')) {
      transcript = transcript.replace(this.transcript, '').trim()
    }
    transcript = transcript.toLowerCase().trim()
    if (transcript === '' || this.transcript === transcript) {
      return
    }
    let lengthContents = this.dataRec.contents.length
    if (lengthContents === 0 || getSimilarityPercentage(transcript, this.transcript) < 50) {
      this.dataRec.contents.push({
        content: transcript,
        id: lengthContents + 1
      })
    } else {
      this.dataRec.contents[lengthContents === 0 ? 0 : lengthContents - 1]['content'] = transcript
    }
    this.transcript = transcript
    $('.onResult > .content-realtime').html(transcript)
    let timeoutRealtime = null
    if (!this.isWaitingSendRealtime) {
      this.isWaitingSendRealtime = true
      timeoutRealtime = setTimeout(() => {
        this.isWaitingSendRealtime = false
        let id = this.dataRec.id_process
        this.sendContent(id, true)
      }, TIME_WAIT_REALTIME_MIC)
    }
    if (this.timeoutStopAudio != null) {
      clearTimeout(this.timeoutStopAudio)
    }
    this.timeoutStopAudio = setTimeout(() => {
      if (timeoutRealtime) {
        clearTimeout(timeoutRealtime)
      }
      let id = this.dataRec.id_process
      this.recognition.abort()
      this.sendContent(id, false)
    }, TIME_WAIT_STOP_MIC)
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

  sendContent (id, isRealtime = true) {
    if (this.dataRec.contents.length === 0) {
      return
    }
    let filterContent = this.dataRec.contents.filter((item) => {
      return item.id === id
    })
    let ids = this.dataRec.contents.map((item) => item.id)
    let maxId = Math.max(ids)
    let contentAll = filterContent.map((item) => item.content).join(' ')
    let textProcessed = this.dataRec.send.filter((item) => {
      return item.id === id
    }).map((item) => item.content).join(' ')
    let spTextProcessed = textProcessed === '' ? [] : textProcessed.split(' ')
    let spContentAll = contentAll === '' ? [] : contentAll.split(' ')
    if (spContentAll.length === spTextProcessed.length) {
      if (id >= maxId) {
        return {}
      }
      return this.sendContent(id + 1, isRealtime)
    }
    let textNewSp = spContentAll.slice(spTextProcessed.length)
    if (maxId > id) {
      this.dataRec.send.push({
        id: id,
        content: textNewSp.join(' ')
      })
      console.log('--->A')
      this.sendToLocal({
        content: textNewSp.join(' '),
        id: id,
      })
      this.dataRec.id_process = id + 1
      return this.sendContent(id + 1, isRealtime)
    }
    if (isRealtime) {
      textNewSp = textNewSp.slice(0, textNewSp.length - 3)
    }
    if (textNewSp.length < 10 && isRealtime) {
      return
    }
    let textNew = textNewSp.join(' ')
    this.dataRec.send.push({
      id: id,
      content: textNew
    })
    this.sendToLocal({
      content: textNew,
      id: id,
    })
  }

  sendToLocal (data) {
    sendLocal(documentEvent.voice, 'send_text_realtime', data)
  }
}
