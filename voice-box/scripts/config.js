const MODE = 'DEV' //PROD, LOCAL, DEV
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
    url: 'https://websocket.dev.cabiz.ai',
    uid_device: '7e2b03f1d451d0bd'
  }
}
const SOCKET_URL = `${config[MODE]['url']}/box`
