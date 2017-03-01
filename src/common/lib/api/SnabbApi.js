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
      return response.json().then(json => {
        throw new ApiError(json.key, { code: json.code, error: json.message });
      });
    }

    return response;
  }

  handleUnExpectedError() {
    throw new ApiError('UNEXPECTED', { code: 500, error: 'Un-expected error message' });
  }

  setSessionToken(sessionToken) {
    this.sessionToken = sessionToken;
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
      .then((res) => res.json().then(json => {
        if (res.status === 200 || res.status === 201) {

          // Store the session token for now here in memory
          self.sessionToken = json;

          return json;
        } else if (res.status === 401) {
          // Due to the fact that the oauth framework used does not support custom error messages we need to do a little
          // fix in the client app to identify a wrong credentials issue.
          throw new ApiError('INVALID_GRANT', { code: 401, error: 'Invalid credentials given.' });
        }

        this.handleUnExpectedError();
      }));
  }

  async createQuote(tasks: Array<Object>) {
    return await fetch(`${this.API_BASE_URL}/delivery/quote`, ({
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ tasks: tasks }),
    }))
      .then(this.handleErrors)
      .then((res) => res.json().then(json => {
        if (res.status === 200 || res.status === 201) {
          return json;
        }

        this.handleUnExpectedError();
      }));
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

        this.handleUnExpectedError();
      }));
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
        if ((res.status === 200 || res.status === 201)) {
          return {};
        }

        this.handleUnExpectedError();
      });
  }

  async getProfile() {
    return await fetch(`${this.API_BASE_URL}/user/profile`, ({
      method: 'GET',
    }))
      .then(this.handleErrors)
      .then((res) => res.json().then(json => {
        if (res.status === 200 || res.status === 201) {
          return json;
        }

        this.handleUnExpectedError();
      }));
  }

  async resetPassword(hash: string, data: UpdatePassword) {
    return await fetch(`${this.API_BASE_URL}/user/resetPassword`, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: this.encodeBody({hash: hash, ...data}),
    })
      .then(this.handleErrors)
      .then((res) => res.json().then(json => {
        if (res.status === 200 || res.status === 201) {
          return json;
        }

        this.handleUnExpectedError();
      }));
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
        if ((res.status === 200 || res.status === 201)) {
          return {};
        }

        this.handleUnExpectedError();
      })
  }

  async updatePassword(data: UpdatePassword) {
    return await fetch(`${this.API_BASE_URL}/user/updatePassword`, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: this.encodeBody(data),
    })
      .then(this.handleErrors)
      .then((res) => res.json().then(json => {
        if (res.status === 200 || res.status === 201) {
          return {};
        }

        this.handleUnExpectedError();
      }));
  }

  async updateProfile(profileId: string, data: Object) {
    return await fetch(`${this.API_BASE_URL}/user/profile/${profileId}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: this.encodeBody(data),
    })
      .then(this.handleErrors)
      .then((res) => res.json().then(json => {
        if (res.status === 200 || res.status === 201) {
          return json;
        }

        this.handleUnExpectedError();
      }));
  }

  async validateAddress(address: string) {
    return await fetch(`${this.API_BASE_URL}/address/validateAddress`, ({
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: this.encodeBody({address: address}),
    }))
      .then(this.handleErrors)
      .then((res) => res.json().then(json => {
        if (res.status === 200 || res.status === 201) {
          return json;
        }

        this.handleUnExpectedError();
      }));
  }

  async verifyUser(hash: string) {
    return await fetch(`${this.API_BASE_URL}/user/verifyUser`, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: this.encodeBody({hash: hash}),
    })
      .then(this.handleErrors)
      .then((res) => {
        if ((res.status === 200 || res.status === 201)) {
          return {};
        }

        this.handleUnExpectedError();
      })
  }
}

export default SnabbApi;

