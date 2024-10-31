export class SpeechSynthesis {
  lang = null

  constructor () {
    this.setup()
  }

  setup () {

  }

  setLangOutput (language) {
    this.lang = language
  }

  playAudio (text, lang) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang // Thiết lập ngôn ngữ thành tiếng Việt
    utterance.rate = 1 // Tốc độ nói (0.1 đến 10)
    utterance.pitch = 1 // Độ cao giọng nói (0 đến 2)
  }
}
