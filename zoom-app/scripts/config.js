const SOCKET_URL_ENV = {
  'local':'http://localhost:3001',
  'dev':'https://websocket-zoom.dev.cabiz.ai',
  'prod':'https://websocket-zoom.cabiz.ai'
}

const getUrlSocket = ()=>{
  const host = window.location.host;
  if(host.includes('localhost')){
    return 'local'
  }

  if(host.includes('.dev') || host.includes('dangtinh97')){
    return 'dev'
  }

  return 'prod';
}

const SOCKET_URL = `${SOCKET_URL_ENV[getUrlSocket()]}/zoom-app`;
const URL_LANG_CONFIG = `${SOCKET_URL_ENV[getUrlSocket()]}/config/lang`
