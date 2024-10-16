document.addEventListener("DOMContentLoaded",()=>{
  let lang = 'vi-VN'
  let cB = null;
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let isStart = false;
  let recognition = null;
  let timeStart = 0;
  $('#lang').on('change',()=>{
    lang = $('#lang').val();
    if(isStart){
      recognition.stop();
    }
  })

  $('#remove-text').on('click',()=>{
    $('.output > pre').html('')
  })
  $('.btn-rec').on('click',()=>{
    autoStart();
    if(!isStart){
      setTimeout(()=>{
        playFromSecond(13)
      },300)
    }else {
      stopAudio()
    }
  })

  const autoStart = ()=>{
    if(!recognition){
      return;
    }
    if(!isStart){
      cB = new Date().getTime();
      recognition.lang = lang;
      recognition.start();
    }else {
      recognition.stop();
    }
  }

  let timeAutoStart = setInterval(()=>{
    clearInterval(timeAutoStart);
    // autoStart();
  },100)

  if (SpeechRecognition) {
    let lastText = '';
    recognition = new SpeechRecognition();

    // Set properties
    // recognition.lang = lang; // Language for recognition
    recognition.continuous = true; // Recognize speech in a single run
    recognition.interimResults = true; // Only return final results'
    recognition.maxAlternatives = 1; // Only return final results'

    let isProcessing = false;
    // Event handler for results
    recognition.onresult = (event) => {
      console.log(recognition.supportedLanguages);
      let transcript = '';
      let isFinals = [];
      for (let i = event.resultIndex; i < event.results.length; i++) {
        isFinals.push(event.results[i].isFinal);
        transcript += event.results[i][0].transcript;
      }
      transcript = transcript.trim()
      var preTag = $('.input > pre');
      preTag.html(transcript + ' ')
      preTag.scrollTop(preTag[0].scrollHeight);
      if(lastText.toLowerCase() === transcript.toLowerCase()){
        return;
      }
      lastText = transcript;
      sendToSocket(lastText, isFinals.indexOf(true)!==-1);
    };

    // Handle errors
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.onstart = ()=>{
      if(timeAutoStart){
        clearInterval(timeAutoStart);
      }

      if(cB){
        console.log(`time started: ${new Date().getTime() - cB }`)
      }
      isStart = true;
      timeStart = new Date()
      $('.btn-rec').addClass('is-stop').html('Stop')
      $('.status > strong').html('Starting...')
    }

    // When recognition ends
    recognition.onend = () => {
      timeEnd = 0;
      // recognition.start();
      isStart = false;
      $('.btn-rec').removeClass('is-stop').html('REC')
      console.log(`Stop is: ${Math.round((new Date().getTime() - timeStart.getTime()) / 1000)} (s)`)
      $('.status > strong').html('Speech recognition '+`${Math.round((new Date().getTime() - timeStart.getTime()) / 1000)} (s)`)
      console.log('Speech recognition has stopped.');
    };
  } else {
    console.log('SpeechRecognition API is not supported in this browser.');
  }

  let timeEnd = 0;
  function sendToSocket(content, isFinal){
    const now = new Date().getTime();
    const duration = timeEnd===0 ? 0:  now - timeEnd;
    timeEnd = now;
    const event = new CustomEvent(EVENT_VOICE, {detail: {content: content.trim(),duration, isFinal}});
    window.dispatchEvent(event);
  }
  const audio = document.getElementById('audioPlayer');
  function playFromSecond(seconds) {
    audio.currentTime = seconds; // Set the start time
    audio.play(); // Start playing
  }
  function stopAudio(){
    audio.pause();
  }
})
