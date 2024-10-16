
export class Socket {
  constructor () {
    this.connect()
    this.name = 'dangtinh'
  }

  connect(){
    let uidDevice = getUidDevice('uid-device');
    const socket = io(SOCKET_URL,{
      auth: {
        uid_device: uidDevice
      }
    })
    socket.on('connect',()=>{
      this.socket = socket;
      this.onConnect(socket);
    })
  }

  onConnect(socket){
    $('#socket-id').html(this.socket.id)
    global.socket_is_connect = true;
    socket.on(socketEvents.config,this.handlerConfig.bind(this))
    socket.on(socketEvents.realtime_message,this.handlerMessageSync.bind(this))
  }

  handlerConfig(data){
    global.box_config = data;
    $('#meeting-oid').html(data.meeting_oid)
    this.sendLocal(socketEvents.config,data)
  }

  handlerMessageSync(data){
    const message = data.message;
    $('.result > p > #content-realtime').html(message)
  }

  sendLocal(type,data={}){
    const event = new CustomEvent(documentEvent.socket, {detail: {
      type,data
      }});
    window.dispatchEvent(event);
  }

  sendContent(data){
    this.socket.emit(socketEvents.realtime_message,data)
  }
}
