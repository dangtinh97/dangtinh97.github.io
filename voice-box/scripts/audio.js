export class Audio {
  constructor () {
    //this.getVoices().then();
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
}
