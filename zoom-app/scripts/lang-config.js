document.addEventListener('DOMContentLoaded', () => {
  let languages = []
  $(ID_LANG_CONFIG).attr('disabled', true)
  $.ajax({
    url: URL_LANG_CONFIG,
    type: 'GET',
    dataType: 'JSON',
    data: {},
    success: ((res) => {
      languages = res.map((item) => {
        item.code_global = item.code_global.replace('_', '-')
        return item
      })
      let append = languages.map((item) => {
        global.languages.push(item)
        return `<option value="${item.code_global.replace('_', '-')}" data-short-lang="${item.code}">${item.name}</option>`
      })
      $(ID_LANG_CONFIG).append(append)
      console.log(global.languages)
    })
  })

  $(ID_LANG_CONFIG).on('change', (event) => {
    let audioOutput = $('#audio-output').val().trim()
    let audioInput = $('#audio-input').val().trim()
    let zoomOutput = $('#zoom-output').val().trim()
    sendLocal(documentEvent.audioConfig, event.target.id, {
      audioOutput: getFullData(audioOutput),
      audioInput: getFullData(audioInput),
      zoomOutput: getFullData(zoomOutput)
    })
  })

  function getFullData (value) {
    return languages.filter((item) => item.code_global === value)[0]
  }
})
