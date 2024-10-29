document.addEventListener('DOMContentLoaded', () => {
  $.ajax({
    url: URL_LANG_CONFIG,
    type: 'GET',
    dataType: 'JSON',
    data: {},
    success: ((res) => {
      let append = res.map((item) => {
        console.log(item)
        return `<option value="${item.code_global.replace('_', '-')}" data-short-lang="${item.code}">${item.name}</option>`
      })
      $('#audio-input , #audio-output, #zoom-output').append(append)
    })
  })

  $('#audio-input , #audio-output, #zoom-output').on('change', (event) => {
    let audioOutput = $('#audio-output').val().trim()
    let audioInput = $('#audio-input').val().trim()
    let zoomOutput = $('#zoom-output').val().trim()
    sendLocal(documentEvent.audioConfig,event.target.id,{
      audioOutput,
      audioInput,
      zoomOutput
    })
  })
})
