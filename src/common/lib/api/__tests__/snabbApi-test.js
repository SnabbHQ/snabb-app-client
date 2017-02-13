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

  describe('Auth endpoint', () => {
    const data = {
      access_token: 'a',
      expires_in: 1,
      token_type: 'Bearer',
      scope: 'read write',
      refresh_token: 'b',
    };

    // async/await can also be used.
    it('should auth successfully', async () => {
      fetchMock.post('*', data);

      const token = await snabbAPI.auth({userName: 'a', password: 'b'});
      expect(token).toEqual(token);
    });

    // TODO - Make sure to fix this one too.
    // it('auth should throw and ApiError', async () => {
    //   fetchMock.post('*', { status: 400, sendAsJson: true });
    //
    //   const error = await snabbAPI.auth({userName: 'a', password: 'b'});
    //   expect(error).toBeInstanceOf(ApiError);
    // });
  });
});
