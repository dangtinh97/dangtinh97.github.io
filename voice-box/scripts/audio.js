export class Audio {
  constructor () {
    this.getVoices().then();
  }

  getVoices(){
    return new Promise((resolve)=>{
      let time = setInterval(()=>{
        const voices = window.speechSynthesis.getVoices();
        console.log(voices);
        if(voices.length>0){
          clearInterval(time)
          return resolve(true)
        }
      },100)
    })
  }

  playAudio(text){
    return new Promise((resolve)=>{
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = this.getLang(); // Thiết lập ngôn ngữ thành tiếng Việt
      utterance.rate = 1; // Tốc độ nói (0.1 đến 10)
      utterance.pitch = 1; // Độ cao giọng nói (0 đến 2)
      // Phát âm thanh
      window.speechSynthesis.speak(utterance);
      utterance.onend = ()=>{
        return resolve(true)
      }
    })
  }

  getLang(){
    return global.box_config.output_language.code_global.replace('_','-');
  }
}
