module.exports = {
  SESSION_TOKEN_KEY: 'SESSION_TOKEN_KEY',
  backend: {
    hapiRemote: false,
    hapiLocal: true
  },
  HAPI: {
    local: {
      // url: 'http://192.168.0.13:5000'
      url: 'http://127.0.0.1:8000/api'
    },
    remote: {
      url: 'http://127.0.0.1:8000/api'
    }
  }
}
