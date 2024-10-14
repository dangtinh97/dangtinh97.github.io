document.addEventListener("DOMContentLoaded",()=>{
  let sortMessage = [];
  fileToData('audio-message.json').then(async (res)=>{
    sortMessage = res;
    const lastAndDuration = res.map((item)=>{
      const textSp = item.content.split(' ');
      return {
        text_last: textSp[textSp.length - 1],
        duration: item.duration
      }
    })
    // console.log(lastAndDuration);
    // let last = messageFromArray(res);
    // const textEdit = await curlAddPunctuation(last);
    // const sp = splitAddPunctuation(textEdit);
    // console.log(sp);
  })


})
