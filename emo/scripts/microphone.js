import {question, getAllValues,findKeyByValue, detect} from './keyword.js'
import {getLang} from './config.js'
export class Microphone {
  active = false;
  isRecognizing = false;
  playAudio = false;
  recognition;
  constructor () {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.active = window.SpeechRecognition;
    console.log(getAllValues(question));
    if(!this.active){
      alert('Microphone not working!')
    }else {
      this.setup();
      this.listen();
      this.result();
    }
  }

  listen(){
    this.playAudio = false;
    this.recognition.start();
  }

  result (){
    this.recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      console.log('Transcript:', transcript);
      if(getAllValues(question).indexOf(transcript)!==-1){
        const detectResult = detect(question,transcript)
        const eventMicrophone = new CustomEvent('microphone',{
          detail: {
            text: transcript,
            ...detectResult
          }
        })
        this.playAudio = true;
        this.recognition.stop()
        document.dispatchEvent(eventMicrophone);
      }
    };
  }

  setup(){
    this.recognition = new SpeechRecognition();
    this.recognition.lang = getLang(); // Thiết lập ngôn ngữ
    // this.recognition.lang = 'vi-VN'; // Thiết lập ngôn ngữ
    this.recognition.interimResults = false; // Không hiển thị kết quả tạm thời
    this.recognition.maxAlternatives = 1; // Số lượng kết quả tối đa
    this.recognition.continuous = true;
    this.recognition.onend = () => {
      console.log("stop recognition")
      if(!this.playAudio){
        console.log('Restart recognition')
        this.recognition.start();
      }

    };

// Xử lý lỗi
    this.recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    this.recognition.onstart = () => {
      console.log("Start recognition")
      this.isRecognizing = true; // Cập nhật cờ trạng thái
    };
  }
}
