module.exports = {
  SESSION_TOKEN_KEY: 'SESSION_TOKEN_KEY',
  backend: {
    local: false,
    develop: true,
    production: false,
  },
  Api: {
    local: {
      url: 'http://127.0.0.1:8000/api',
    },
    develop: {
      url: 'https://snabb-api-mock.herokuapp.com/api/v1',
    },
  },
};
