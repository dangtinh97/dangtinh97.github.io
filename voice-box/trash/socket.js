document.addEventListener('DOMContentLoaded', () => {
  const MODE = 'LOCAL' //PROD, LOCAL, DEV
  const config = {
    'PROD': {
      url: 'https://websocket.cabiz.ai',
      uid_device: 'f7558483bad6908'
    },
    'LOCAL': {
      url: 'http://localhost:3001',
      uid_device: '93cbb718d5d790e2'
    },
    'DEV': {
      url: 'https://cb-websocket.dev.locago.tech',
      uid_device: '7e2b03f1d451d0bd'
    }
  }
  const socket = io(`${config[MODE]['url']}/box`,
    {
      transports: ['websocket', 'polling'],
      auth: {
        uid_device: config[MODE]['uid_device'],
      }
    })
  socket.on('connect', () => {
    $('#socket-id > strong').html(socket.id)
    socket.on('CONFIG', (res) => {
      log(res, 'CONFIG')
    })
    socket.on('MESSAGE', (res) => {
      $('.output > #message').prepend(JSON.stringify(res,null, 4))
    })
    socket.on('CONFIG', (data) => {
      $('#meeting_oid > strong').html(data.meeting_oid)
    })
    socket.on('MESSAGE_SYNC',(res)=>{
      $('.output > #message-sync').append(`<li>${res.message}</li>`)
      var preTag = $('.output > #message-sync');
      preTag.scrollTop(preTag[0].scrollHeight);
      // socket.emit('MESSAGE',{
      //   content: res.message ?? ''
      // })
    })
  })

  $('#send-message').on('click', () => {
    const content = $('#content').val().trim()
    if (content === '') {
      return
    }
  })

  function log (text, key = null) {
    const dataLog = typeof text === 'object' ? JSON.stringify(text, null, 4) : text
    if (!key) {
      $('#log').prepend(dataLog + '\n')
      return
    }
    $('#log').prepend(JSON.stringify({
      time: new Date(),
      key: key,
      dataLog: text,
    }, null, 4) + '\n')
  }

  $('#clear').on('click', () => {
    $('#log').html('')
  })

  let timeLast = 0
  window.addEventListener(EVENT_VOICE, (e) => {
    const {content} = e.detail
    timeLast = new Date().getTime()
    socket.emit('REALTIME_MESSAGE', {
      ...e.detail,
      time: new Date().getTime()
    })
  })

  $('#send-test').on('click', async () => {
    const values = await dataJson();
    console.log(values)
    for (let i = 0; i < values.length; i++) {
      const dataSend = JSON.parse(values[i].value)
      const delay = JSON.parse(values[i+1].value).duration
      await sleep(delay)
      $('.input > pre').html(dataSend.content);
      socket.emit('REALTIME_MESSAGE', dataSend)
    }
  })
  $('#send-a-word').on('click', () => {
    socket.emit('REALTIME_MESSAGE', {
      content: 'demo send test' + new Date().toString(),
      time: new Date().getTime()
    })
  })

  const dataJson = ()=>{
    let data = [];
    return new Promise((resolve, reject)=>{

      $.ajax('./message.json',{
        method:"GET",
        dataType:"JSON",
        success: (res)=>{
          return resolve(res);
          data = res.map(item=>{
            return JSON.parse(item.value)
          })
          resolve(data);
        }
      })
    })

  }
})
