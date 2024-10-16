document.addEventListener("DOMContentLoaded",()=>{
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let isStart = false;
  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();

    // List of languages to test
    const languages = ['en-US','vudangtinh', 'vi-VN', 'fr-FR', 'es-ES', 'ja-JP','dangtinh'];

    // Hàm xử lý nhận diện giọng nói
    const checkLanguage =async (lang) => {
      recognition.stop();
      await sleep(1000);
      return new Promise(async (resolve, reject) => {
        recognition.lang = lang;
        console.log(`Testing language: ${lang}`);

        recognition.onstart = () => {
          isStart = true;
          console.log(`Recognition started for ${lang}`);
        };

        recognition.onerror =async (event) => {
          isStart = false;
          console.error(`Error with ${lang}:`, event.error);
          resolve();  // Tiếp tục dù có lỗi
        };

        recognition.onend =async () => {
          isStart = false;
          console.log(`Recognition ended for ${lang}`);
          resolve();  // Giải phóng sau khi kết thúc
        };

        try {
          recognition.start();
        } catch (err) {
          console.error(`Could not start recognition for ${lang}:`, err);
          resolve();
        }
      });
    };

    // Hàm bất đồng bộ để chờ từng ngôn ngữ được kiểm tra
    const checkLanguages = async () => {
      for (let lang of languages) {
        let start = new Date().getTime();
        await checkLanguage(lang);  // Chờ mỗi ngôn ngữ hoàn tất trước khi tiếp tục
        let end =new Date().getTime();
        console.log(end-start, lang)
      }
      console.log('All languages have been tested.');
    };

    checkLanguages();  // Bắt đầu quá trình
  } else {
    console.error('SpeechRecognition API is not supported in this browser.');
  }

  function sleep(ms){
    return new Promise((resolve)=>{
      setTimeout(()=>{
        resolve()
      },ms)
    })
  }

})
