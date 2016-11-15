/**
 * # Hapi.js
 *
 * This class interfaces with Hapi.com using the rest api
 * see [http://hapijs.com/api](http://hapijs.com/api)
 *
 */
'use strict'

/**
 * ## Imports
 *
 * Config for defaults and underscore for a couple of features
 */
import CONFIG from './config'
import _ from 'underscore'
import Backend from './Backend'

var fakeUser = {
  objectId: "Z4yvP19OeL",
  sessionToken: "r:uFeYONgIsZMPyxOWVJ6VqJGqv",
  updatedAt: "2015-12-30T15:29:36.611Z",
  name: 'Michael',
  lastName: 'Knight',
  userName: 'michaelKnight',
  email: 'michael.knight@snabb.io',
  phoneNumber: '+46712345678',
  thumbnail: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTlovN715rKGVOscWvovnblMwpvwMlknTosSXthVP9xLlW7KCfw'
}

export default class SnabbApi extends Backend {

  /**
   * ## Hapi.js client
   *
   *
   * @throws tokenMissing if token is undefined
   */
  constructor (token) {
    super(token)
    if (!_.isNull(token) && _.isUndefined(token.sessionToken)) {
      throw new Error('TokenMissing')
    }
    this._sessionToken =
      _.isNull(token) ? null : token.sessionToken.sessionToken

    this.API_BASE_URL = CONFIG.backend.hapiLocal
          ? CONFIG.HAPI.local.url
          : CONFIG.HAPI.remote.url

    var _bodyInit = JSON.stringify({
      code: 200
    })
    this.response = {
      'status': 201
    }
    this.response._bodyInit = _bodyInit
  }

  /**
   * ### signup
   *
   * @param data object
   *
   * {email: "foo@gmail.com", password: "Passw0rd!"}
   *
   * @return
   * if ok, res.json={createdAt: "2015-12-30T15:17:05.379Z",
   *   objectId: "5TgExo2wBA",
   *   sessionToken: "r:dEgdUkcs2ydMV9Y9mt8HcBrDM"}
   *
   * if error, {code: xxx, error: 'message'}
   */
  async signup (data) {
    return await this._fetch({
      method: 'POST',
      url: '/account/register',
      body: data
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          return res.json
        } else {
          throw res.json
        }
      })
      .catch((error) => {
        throw (error)
      })
  }

  /**
   * ### login
   * encode the data and and call _fetch
   *
   * @param data
   *
   *  {email: "barton@foo.com", password: "Passw0rd!"}
   *
   * @returns
   *
   * createdAt: "2015-12-30T15:29:36.611Z"
   * updatedAt: "2015-12-30T16:08:50.419Z"
   * objectId: "Z4yvP19OeL"
   * email: "barton@foo.com"
   * sessionToken: "r:Kt9wXIBWD0dNijNIq2u5rRllW"
   *
   */
  async login (data) {
    return await this._fetch({
      method: 'POST',
      url: '/auth/login/',
      body: data
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          return {
            createdAt: "2015-12-30T15:29:36.611Z",
            updatedAt: "2015-12-30T16:08:50.419Z",
            objectId: "Z4yvP19OeL",
            email: "barton@foo.com",
            sessionToken: "r:Kt9wXIBWD0dNijNIq2u5rRllW"
          }
        } else {
          throw (res.json)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }
  /**
   * ### logout
   * prepare the request and call _fetch
   */
  async logout () {
    return await this._fetch({
      method: 'POST',
      url: '/account/logout',
      body: {}
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201) ||
            (res.status === 400 && res.code === 209)) {
          return {}
        } else {
          throw new Error({code: res.statusCode, error: res.message})
        }
      })
      .catch((error) => {
        throw (error)
      })
  }
  /**
   * ### resetPassword
   * the data is already in a JSON format, so call _fetch
   *
   * @param data
   * {email: "barton@foo.com"}
   *
   * @returns empty object
   *
   * if error:  {code: xxx, error: 'message'}
   */
  async resetPassword (data) {
    return await this._fetch({
      method: 'POST',
      url: '/account/resetPasswordRequest',
      body: data
    })
      .then((response) => {
        if ((response.status === 200 || response.status === 201)) {
          return {}
        } else {
          var res = JSON.parse(response._bodyInit)
          throw (res)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }
  /**
   * ### getProfile
   * Using the sessionToken, we'll get everything about
   * the current user.
   *
   * @returns
   *
   * if good:
   * {createdAt: "2015-12-30T15:29:36.611Z"
   *  email: "barton@acclivyx.com"
   *  objectId: "Z4yvP19OeL"
   *  sessionToken: "r:uFeYONgIsZMPyxOWVJ6VqJGqv"
   *  updatedAt: "2015-12-30T15:29:36.611Z"}
   *
   * if error, {code: xxx, error: 'message'}
   */
  async getProfile () {
    return await this._fetch({
      method: 'GET',
      url: '/account/profile/me'
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201)) {
          return fakeUser
        } else {
          throw (res.json)
        }
      })
      .catch((error) => {
        throw (error)
      })
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
  async updateProfile (userId, data) {
    return await this._fetch({
      method: 'POST',
      url: '/account/profile/' + userId,
      body: data
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201)) {

          // TODO - Obviously this should never be here
          fakeUser = data;

          return {}
        } else {
          throw (res.json)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }

  /**
   * ### _fetch
   * A generic function that prepares the request
   *
   * @returns object:
   *  {code: response.code,
   *   status: response.status,
   *   json: response.json()
   */
  async _fetch (opts) {
    return await this.response
  }
};

