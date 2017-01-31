// @flow
// https://github.com/github/fetch/issues/275#issuecomment-181784694
import type {Register, UpdatePassword} from '../../types';
import ApiError  from './ApiError';
import fetchIntercept from 'fetch-intercept';

import 'whatwg-fetch';

/**
 * # SnabbApi.js
 *
 * This class interfaces with Snabb's API using the rest api.
 *
 */
class SnabbApi {
  API_BASE_URL: string;
  client_id: string;
  sessionToken: Object;
  response: Object;

  constructor(apiConfig) {
    this.API_BASE_URL = apiConfig.baseUrl;
    this.client_id = apiConfig.clientId;

    fetchIntercept.register({

      request: (url, config) => {
        if (this.sessionToken) {

          // Not really pretty but works
          if (config.headers) {
            config.headers['Authorization'] = this.getSessionToken();
          } else {
            config.headers = { 'Authorization': this.getSessionToken() };
          }
        }

        return [url, config];
      }
    });
  }

  encodeBody(data) {
    let formBody = [];

    for (const property in data) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(data[property]);
      formBody.push(`${encodedKey}=${encodedValue}`);
    }

    return formBody.join('&');
  }

  handleErrors(response) {
    if (!response.ok) {
      throw ApiError(response.statusText);
    }
    return response;
  }

  getSessionToken() {
    return this.sessionToken && this.sessionToken.access_token ? 'Bearer ' + this.sessionToken.access_token : undefined;
  }

  async auth(data: Object) {
    const authDetails = {
      client_id: this.client_id,
      username: data.username,
      password: data.password,
      grant_type: 'password',
    };

    let self = this;

    return await fetch(`${this.API_BASE_URL}/o/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: this.encodeBody(authDetails),
    })
      .then(this.handleErrors)
      .then((res) => res.json().then(json => {
        if (res.status === 200 || res.status === 201) {

          // Store the session token for now here in memory
          self.sessionToken = json;

          return json;
        }

        throw new ApiError({code: 500, error: 'error'});
      }))
      .catch((error) => {
        throw new ApiError({code: error.statusCode, error: error.message});
      });
  }

  async register(data: Register) {
    return await fetch(`${this.API_BASE_URL}/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: this.encodeBody(data),
    })
      .then(this.handleErrors)
      .then((res) => res.json().then(json => {
        if (res.status === 200 || res.status === 201) {
          return json;
        }

        throw (json);
      }))
      .catch((error) => {
        throw (error);
      });
  }

  async logout() {

    // Clear teh session
    this.sessionToken = null;

    // return await fetch({
    //   method: 'POST',
    //   url: '/o/token/revoke',
    //   body: {},
    // })
    //   .then(this.handleErrors)
    //   .then((res) => {
    //     if ((res.status === 200 || res.status === 201) ||
    //       (res.status === 400 && res.code === 209)) {
    //       return {};
    //     } else {
    //       throw new ApiError({code: res.statusCode, error: res.message});
    //     }
    //   })
    //   .catch((error) => {
    //     throw (error);
    //   });
  }

  async forgotPassword(email: string) {
    return await fetch(`${this.API_BASE_URL}/user/forgotPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: this.encodeBody({email: email}),
    })
      .then(this.handleErrors)
      .then((res) => {
        if ((res.status === 200 || res.status === 201) ||
          (res.status === 400 && res.code === 209)) {
          return {};
        } else {
          throw new ApiError({code: res.statusCode, error: res.message});
        }
      })
      .catch((error) => {
        throw (error);
      });
  }

  async getProfile() {
    return await fetch(`${this.API_BASE_URL}/user/profile/`, ({
      method: 'GET',
    }))
      .then(this.handleErrors)
      .then((res) => res.json().then(json => {
        if (res.status === 200 || res.status === 201) {
          return json;
        }

        throw (json);
      }))
      .catch((error) => {
        throw (error);
      });
  }

  async sendVerifyEmail(email: string) {
    return await fetch(`${this.API_BASE_URL}/user/sendVerifyEmail`, ({
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: this.encodeBody({ email: email }),
    }))
      .then(this.handleErrors)
      .then((res) => {
        if ((res.status === 200 || res.status === 201) ||
          (res.status === 400 && res.code === 209)) {
          return {};
        } else {
          throw new ApiError({code: res.statusCode, error: res.message});
        }
      })
  }

  async updatePassword(profileId: string, data: UpdatePassword) {
    return await fetch(`${this.API_BASE_URL}/user/updatePassword/${profileId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: this.encodeBody(data),
    })
      .then(this.handleErrors)
      .then((res) => res.json().then(json => {
        if (res.status === 200 || res.status === 201) {
          return json;
        }

        throw (json);
      }))
      .catch((error) => {
        throw (error);
      });
  }

  async updateProfile(profileId: string, data: Object) {
    return await fetch(`${this.API_BASE_URL}/user/profile/${profileId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: this.encodeBody(data),
    })
      .then(this.handleErrors)
      .then((res) => res.json().then(json => {
        if (res.status === 200 || res.status === 201) {
          return json;
        }

        throw (json);
      }))
      .catch((error) => {
        throw (error);
      });
  }

  async verifyUser(hash: string) {
    return await fetch(`${this.API_BASE_URL}/user/verifyUser`, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: this.encodeBody({hash: hash}),
    })
      .then(this.handleErrors)
      .then((res) => {
        if ((res.status === 200 || res.status === 201) ||
          (res.status === 400 && res.code === 209)) {
          return {};
        } else {
          // TODO - throw the right error when we know error codes
          //throw new ApiError('userAlreadyVerified', { code: res.statusCode, error: res.message });
          throw new ApiError({code: res.statusCode, error: res.message});
        }
      })
  }

  /**
   * ### fetch
   * A generic function that prepares the request
   *
   * @returns object:
   *  {code: response.code,
   *   status: response.status,
   *   json: response.json()
   */
  async _fetch(opts) {
    opts = _.extend({
      method: 'GET',
      url: null,
      body: null,
      callback: null,
    }, opts);

    const reqOpts = {
      method: opts.method,
      headers: {
        // 'X-Parse-Application-Id': this._applicationId,
        // 'X-Parse-REST-API-Key': this._restAPIKey,
      },
    };

    // if (this._sessionToken) {
    //   //reqOpts.headers['X-Parse-Session-Token'] = this._sessionToken;
    // }

    if (opts.method === 'POST' || opts.method === 'PUT') {
      reqOpts.headers.Accept = 'application/json';
      reqOpts.headers['Content-Type'] = 'application/json';
    }

    if (opts.body) {
      reqOpts.body = JSON.stringify(opts.body);
    }

    return await fetch(this.API_BASE_URL + opts.url, reqOpts);
  }
}

export default SnabbApi;

