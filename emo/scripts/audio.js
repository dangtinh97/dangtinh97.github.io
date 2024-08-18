import {getLang} from './config.js'
export class Audio {
  constructor () {
    this.getVoices().then()
  }

  play (text){
    return new Promise((resolve)=>{
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = getLang(); // Thiết lập ngôn ngữ thành tiếng Việt
      utterance.rate = 1; // Tốc độ nói (0.1 đến 10)
      utterance.pitch = 1; // Độ cao giọng nói (0 đến 2)
      // Phát âm thanh
      window.speechSynthesis.speak(utterance);
      utterance.onend = ()=>{
        return resolve(true)
      }
    })

  }

  getVoices(){
    return new Promise((resolve)=>{
      let time = setInterval(()=>{
        const voices = window.speechSynthesis.getVoices();
        if(voices.length>0){
          clearInterval(time)
          return resolve(true)
        }
      },100)
    })
  }
}
