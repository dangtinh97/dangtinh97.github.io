const SOCKET_URL_ENV = {
  'local':'http://localhost:3001',
  'dev':'https://websocket-zoom.dev.cabiz.ai',
  'prod':'https://websocket-zoom.cabiz.ai'
}

const getUrlSocket = ()=>{
  const host = window.location.host;
  if(host.includes('localhost')){
    return SOCKET_URL_ENV['local']
  }

  if(host.includes('.dev')){
    return SOCKET_URL_ENV['dev']
  }

  return SOCKET_URL_ENV['prod']
}

const SOCKET_URL = `${getUrlSocket()}/zoom`;
