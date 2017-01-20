// @flow
// https://github.com/github/fetch/issues/275#issuecomment-181784694
import type {Profile, Register, UpdatePassword} from '../types';
import 'whatwg-fetch';

/**
 * # SnabbApi.js
 *
 * This class interfaces with Snabb's API using the rest api.
 *
 */
class SnabbApi {
  API_BASE_URL: string;
  sessionToken: string;
  response: Object;

  constructor(apiConfig) {
    this.API_BASE_URL = apiConfig.baseUrl;

    const bodyInit = JSON.stringify({
      code: 200,
    });

    this.response = {
      status: 201,
      bodyInit,
    };
  }

  async auth(data: Object) {
    const authDetails = {
      client_id: '123',
      username: data.username,
      password: data.password,
      grant_type: 'password',
    };

    return await fetch(`${this.API_BASE_URL}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: this.encodeBody(authDetails),
    })
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

  async register(data: Register) {
    return await fetch(`${this.API_BASE_URL}/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: this.encodeBody(data),
    })
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
    return await this.fetchMock({
      method: 'POST',
      url: '/oauth/token/revoke',
      body: {},
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201) ||
          (res.status === 400 && res.code === 209)) {
          return {};
        } else {
          throw new Error({ code: res.statusCode, error: res.message });
        }
      })
      .catch((error) => {
        throw (error);
      });
  }

  async forgotPassword(email: string) {
    return await fetch(`${this.API_BASE_URL}/user/forgotPassword`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: this.encodeBody(email),
    })
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

  async getProfile() {
    return await fetch(`${this.API_BASE_URL}/user/profile`, {
      method: 'GET'
    })
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

  async updatePassword(profileId: string, data: UpdatePassword) {
    return await fetch(`${this.API_BASE_URL}/user/updatePassword/${profileId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: this.encodeBody(data),
    })
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
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: this.encodeBody(data),
    })
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

  /**
   * ### fetch
   * A generic function that prepares the request
   *
   * @returns object:
   *  {code: response.code,
   *   status: response.status,
   *   json: response.json()
   */
  async fetchMock(opts) {
    return await this.response;
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
}

export default SnabbApi;

