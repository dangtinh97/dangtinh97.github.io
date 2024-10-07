document.addEventListener("DOMContentLoaded", () => {
  const MODE = 'LOCAL'; //PROD, LOCAL, DEV
  const config = {
    'PROD':{
      url:'https://websocket.cabiz.ai',
      uid_device:'f7558483bad6908'
    },
    'LOCAL':{
      url:'http://localhost:3001',
      uid_device:'93cbb718d5d790e2'
    },
    'DEV':{
      url:'https://cb-websocket.dev.locago.tech',
      uid_device:'7e2b03f1d451d0bd'
    }
  }
  const socket = io(`${config[MODE]['url']}/box`,
    {
      transports: ["websocket", "polling"],
      auth:{
        uid_device: config[MODE]['uid_device'],
      }
    });
  socket.on("connect", () => {
    $("#socket-id > strong").html(socket.id);
    socket.on('CONFIG',(res)=>{
      log(res,'CONFIG');
    })
    socket.on('MESSAGE',(res)=>{
      log(res,'MESSAGE');
    })
    socket.on('CONFIG',(data)=>{
      $('#meeting_oid > strong').html(data.meeting_oid)
    })
  });

  $('#send-message').on('click',()=>{
    const content = $('#content').val().trim()
    if(content==''){
      return;
    }
  })

  function log(text,key = null){
    const dataLog = typeof text==='object' ? JSON.stringify(text,null,4) : text;
    if(!key){
      $('#log').prepend(dataLog+'\n')
      return;
    }
    $('#log').prepend(JSON.stringify({
      time: new Date(),
      key: key,
      dataLog: text,
    }, null, 4)+'\n')
  }

  $('#clear').on('click',()=>{
    $('#log').html('')
  })

  let timeLast = 0;
  window.addEventListener(EVENT_VOICE,(e)=>{
    const message = e.detail.message;
    console.log(new Date().getTime() - timeLast, message)
    timeLast = new Date().getTime();
    socket.emit('REALTIME_MESSAGE',{
      content: message,
      time: new Date().getTime()
    })
  })

  $('#send-test').on('click',async ()=>{
    const values = TEXT_DEMO.split(' ')
    console.log(values)
    for(let i=0;i<values.length;i++){
      await sleep(10)
      socket.emit('REALTIME_MESSAGE',{
        content: values.slice(0,i+1).join(' '),
        time: new Date().getTime()
      })
    }
  })
  $('#send-a-word').on('click',()=>{
    socket.emit('REALTIME_MESSAGE',{
      content: 'demo send test',
      time: new Date().getTime()
    })
  })
});
