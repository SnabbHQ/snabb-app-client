import request from 'superagent';
import { camelizeKeys } from 'humps';
import qs from 'qs';
import configuration from '../../configuration';
import { refreshClient } from '../auth/authUtils';

const STUART_API_ROOT = configuration.stuartApiRoot;

export default function createApiClient(token, retryRequest) {
  let _token = token;

  function requestStuart(method, endpoint, parameters, headers, retryCount = 0) {
    endpoint = endpoint.indexOf('http') === -1 ? `${STUART_API_ROOT}/${endpoint.replace(/^\//, '')}` : endpoint;

    headers = { Accept: 'application/json', ...headers };
    if (_token) {
      headers.Authorization = `Bearer ${_token}`;
    }

    const [url, query] = endpoint.split('?');
    const r = request[method](url).set(headers);

    if (method === 'get') {
      if (query) {
        parameters = { ...qs.parse(query), ...parameters };
      }

      r.query(qs.stringify(parameters, { arrayFormat: 'brackets' }));
    } else {
      r.send(parameters);
    }

    const promise = new Promise((resolve, reject) => {
      r.end((error, response) => {
        if (error) {
          if (error.response && error.response.body) {
            error.response.body = camelizeKeys(error.response.body);
          }

          return reject(error);
        }

        resolve({ body: camelizeKeys(response.body), response });
      });
    }).catch((error) => {
      const shouldRetry = retryRequest && error.response.status === 401 && retryCount < 1;
      if (shouldRetry) {
        return refreshClient().then((client) => {
          if (client && client.token) {
            // Set the new token and perform the request again.
            _token = client.token;
            return requestStuart(method, endpoint, parameters, headers, retryCount + 1);
          }

          // Reload the dashboard when the client cannot be refreshed.
          if (typeof document !== 'undefined') { document.location = '/'; }
        });
      }

      // Throw the original error if the request should not be retried.
      throw error;
    });

    return promise;
  }

  return {
    request: requestStuart,
    del: requestStuart.bind(null, 'del'),
    get: requestStuart.bind(null, 'get'),
    patch: requestStuart.bind(null, 'patch'),
    post: requestStuart.bind(null, 'post'),
    put: requestStuart.bind(null, 'put'),
    toJSON() { return null; },
  };
}
