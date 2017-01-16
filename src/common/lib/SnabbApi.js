// @flow
// https://github.com/github/fetch/issues/275#issuecomment-181784694
import 'whatwg-fetch';

/**
 * # SnabbApi.js
 *
 * This class interfaces with Snabb's API using the rest api.
 *
 */

let fakeProfile = {
  objectId: 'Z4yvP19OeL',
  sessionToken: 'r:uFeYONgIsZMPyxOWVJ6VqJGqv',
  updatedAt: '2015-12-30T15:29:36.611Z',
  name: 'Michael',
  lastName: 'Knight',
  userName: 'michaelKnight',
  email: 'michael.knight@snabb.io',
  phoneNumber: '+46712345678',
  thumbnail: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTlovN715rKGVOscWvovnblMwpvwMlknTosSXthVP9xLlW7KCfw',
};

class SnabbApi {

  API_BASE_URL: string
  sessionToken: string
  response: Object

  /**
   * ## SnabbApi.js client
   */
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

  /**
   * ### logIn
   * encode the data and and call fetch
   *
   * @param data
   *
   *  {email: "barton@foo.com", password: "Passw0rd!"}
   */
  async auth(data: Object) {
    let formBody = [];

    const authDetails = {
      client_id: '123',
      username: data.username,
      password: data.password,
      grant_type: 'password',
    };

    for (const property in authDetails) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(authDetails[property]);
      formBody.push(`${encodedKey}=${encodedValue}`);
    }

    formBody = formBody.join('&');

    return await fetch(`${this.API_BASE_URL}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formBody,
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
   * ### register
   */
  async register(data: Object) {
    return await this.fetchMock({
      method: 'POST',
      url: '/account/register',
      body: data,
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          return res.json;
        } else {
          throw res.json;
        }
      })
      .catch((error) => {
        throw (error);
      });
  }

  /**
   * ### logout
   * prepare the request and call _fetch
   */
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

  /**
   * ### resetPassword
   * the data is already in a JSON format, so call _fetch
   */
  async resetPassword(data: Object) {
    return await this.fetchMock({
      method: 'POST',
      url: '/account/resetPasswordRequest',
      body: data,
    })
      .then((response) => {
        if ((response.status === 200 || response.status === 201)) {
          return {};
        } else {
          throw (JSON.parse(response.bodyInit));
        }
      })
      .catch((error) => {
        throw (error);
      });
  }

  /**
   * ### getProfile
   * Using the sessionToken, we'll get everything about
   * the current user.
   *
   * @returns
   */
  async getProfile() {
    return await this.fetchMock({
      method: 'GET',
      url: '/account/profile/me',
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201)) {
          return fakeProfile;
        } else {
          throw (res.json);
        }
      })
      .catch((error) => {
        throw (error);
      });
  }

  /**
   * ### updateProfile
   * for this user, update their record
   * the data is already in JSON format
   *
   * @param userId  _id
   * @param data object:
   * {email: "barton@foo.com"}
   */
  async updateProfile(userId: string, data: Object) {
    return await this.fetchMock({
      method: 'POST',
      url: `/account/profile/${userId}`,
      body: data,
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201)) {
          // TODO - Obviously this should never be here
          fakeProfile = data;

          return {};
        } else {
          throw (res.json);
        }
      })
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
}

export default SnabbApi;

