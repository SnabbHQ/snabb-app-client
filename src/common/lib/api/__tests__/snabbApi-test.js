/**
 * Collection of tests for all the snabb api library
 */

import fetchMock from 'fetch-mock';
import SnabbApi from '../SnabbApi';
import ApiError from '../ApiError';

let snabbAPI;

describe('All Snabb API tests', () => {

  beforeEach(() => {
    snabbAPI = new SnabbApi({
      apiConfig: {
        baseUrl: 'mock',
        clientId: '',
      },
    });
  });

  afterEach(() => {
    fetchMock.restore();
  });

  describe('Login endpoint', () => {
    const data = {
      access_token: 'a',
      expires_in: 1,
      token_type: 'Bearer',
      scope: 'read write',
      refresh_token: 'b',
    };

    it('should login successfully', () => {
      fetchMock.post('*', data);

      snabbAPI.auth({userName: 'a', password: 'b'})
        .then(res => expect(res).toEqual(data));
    });

    it('should throw and ApiError', () => {
      fetchMock.post('*', 400);

      snabbAPI.auth({userName: 'a', password: 'b'})
        .catch(error => expect(error).toBeInstanceOf(ApiError));
    });
  });
});
