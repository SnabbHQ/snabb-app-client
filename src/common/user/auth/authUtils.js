import request from 'superagent';

function authRequest(method, path, data) {
  return new Promise((resolve, reject) => {
    request[method](path).send(data).end((error, response) => {
      if (error) {
        return reject(error);
      }

      resolve(response.body);
    });
  });
}

export const refreshClient = authRequest.bind(null, 'get', '/auth/client');
export const signUp = authRequest.bind(null, 'post', '/auth/sign-up');
export const logIn = authRequest.bind(null, 'post', '/auth/log-in');
