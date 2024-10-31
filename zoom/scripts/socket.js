export class Socket{
  socket;
  constructor (session) {
    this.session = session;
  }

  connect(){
    this.socket = io(SOCKET_URL,{
      auth:{
        'room_id': this.session
      },
      transports:['websocket','polling']
    })
    this.socket.on('connect',this.socketConnected.bind(this))
    this.socket.on(socketEvents.realtime_message,this.handleRealTimeMessage.bind(this))

  }

  socketConnected(){
    showQrCode(this.session)
    this.socket.on(socketEvents.app_connected,this.handleAppJoinRoom.bind(this))
  }

  handleAppJoinRoom(data){
    $('#qrcode-success').removeClass('d-none')
    $('.modal-footer').show()
  }

  handleRealTimeMessage(data){
    sendLocal(documentEvent.audio, 'play_to_zoom',data)
  }
}
