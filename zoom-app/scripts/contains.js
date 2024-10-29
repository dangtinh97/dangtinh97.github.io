const statusInputVoice = {
  on: 'ON',
  off: 'OFF'
}

const socketEvents = {
  'config': 'CONFIG',
  'realtime_message':'REALTIME_MESSAGE',
  'realtime_stop':'REALTIME_MESSAGE_STOP',
  'message':'MESSAGE',
  'delete_cache':'DELETE_CACHE',
  'join':'JOIN',
  'app_connected':'ZOOM_APP_CONNECTED'
}

const voiceEvents = {
  content:'CONTENT',
  time_wait_send:'TIME_WAIT_SEND'
}

const documentEvent = {
  socket:'SOCKET',
  voice: 'VOICE',
  checking: 'CHECKING'
}

const TIME_WAIT_SEND = 4000;
