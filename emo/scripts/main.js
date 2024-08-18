import { LoadImage } from './load-image.js'
import { Microphone } from './microphone.js'
import {Audio} from './audio.js'
import {Ai} from './ai.js'
document.addEventListener("grantedPermission",()=>{
  console.log("READY!!!!")
  const loadImage = new LoadImage()
  const microphone = new Microphone();
  const audio = new Audio();
  const ai = new Ai();
  document.addEventListener("microphone",({detail})=>{
    if(detail.key==='time'){
      detail.voice = ai.timeNow()
    }
    console.log(detail);
    audio.play(detail.voice).then(()=>{
      microphone.listen()
    })
  })
})
