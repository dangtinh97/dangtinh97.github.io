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
  'app_connected':'ZOOM_APP_CONNECTED',
  'microphone_status':'MICROPHONE_STATUS'
}

const voiceEvents = {
  content:'CONTENT',
  time_wait_send:'TIME_WAIT_SEND'
}

const documentEvent = {
  socket:'SOCKET',
  voice: 'VOICE',
  checking: 'CHECKING',
  audioConfig: 'AUDIO_CONFIG'
}

const TIME_WAIT_REALTIME_MIC = 8000;
const TIME_WAIT_STOP_MIC = 4000;

const ID_LANG_CONFIG = '#audio-input , #audio-output, #zoom-output'
