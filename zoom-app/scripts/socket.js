export class SocketModule {
  socket

  constructor () {
  }

  connect (session) {
    this.socket = io(SOCKET_URL, {
      auth: {
        session_id: session
      },
      transports: ['websocket', 'polling']
    })
    this.socket.on('connect', this.socketConnected.bind(this))
  }

  socketConnected () {
    $(ID_LANG_CONFIG).attr('disabled',false)
  }

  sendConfig(data){
    this.socket.emit(socketEvents.config,data)
  }

  statusMicrophone(isRec){
    this.socket.emit(socketEvents.microphone_status,{
      status: isRec ? 'ON' : 'OFF',
    })
  }

  sendContent(data){
    console.log(data)
    this.socket.emit(socketEvents.realtime_message,data)
  }
}
