export class Socket{
  socket;
  constructor () {
    this.connect()
  }

  connect(session){
    this.socket = io(SOCKET_URL,{
      transports:['websocket','polling']
    })
    this.socket.on('connect',this.socketConnected.bind(this))
  }

  socketConnected(){

  }

  joinRoom(roomId){
    this.socket.emit(socketEvents.join,{
      'room_id': roomId
    })
  }
}
