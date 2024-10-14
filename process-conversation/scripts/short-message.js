document.addEventListener("DOMContentLoaded",()=>{
  let sortMessage = [];
  fileToData('sort-message.json').then(async (res)=>{
    sortMessage = res;
    let last = messageFromArray(res);
    const textEdit = await curlAddPunctuation(last);
    const sp = splitAddPunctuation(textEdit);
    console.log(sp);
  })
})
