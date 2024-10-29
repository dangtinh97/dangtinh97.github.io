document.addEventListener("DOMContentLoaded",()=>{
  $.ajax({
    url: URL_LANG_CONFIG,
    type:"GET",
    dataType:"JSON",
    data:{},
    success:((res)=>{
      let append = res.map((item)=>{
        console.log(item)
        return `<option value="${item.code_global.replace('_','-')}" data-short-lang="${item.code}">${item.name}</option>`
      })

      $('#audio-input , #audio-output').append(append)
    })
  })
})
