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
  }

  socketConnected(){
    showQrCode(this.session)
  }
}
