/**
 * # Backend.js
 *
 * Abstract Base class for Backend support
 *
 */


/**
 * ## Async support
 *
 */
require('regenerator/runtime');

export default class Backend {
  /**
   * ### register
   *
   * @param data object
   *
   * {email: "foo@gmail.com", password: "Passw0rd!"}
   *
   * @return
   * if ok, {createdAt: "2015-12-30T15:17:05.379Z",
   *   objectId: "5TgExo2wBA",
   *   sessionToken: "r:dEgdUkcs2ydMV9Y9mt8HcBrDM"}
   *
   * if error, {code: xxx, error: 'message'}
   */
  register(data) {

  }
 /**
   * ### logIn
   * encode the data and and call _fetch
   *
   * @param data
   *
   *  {password: "Passw0rd!"}
   *
   * @returns
   *
   * createdAt: "2015-12-30T15:29:36.611Z"
   * email: "barton@foo.com"
   * objectId: "Z4yvP19OeL"
   * sessionToken: "r:Kt9wXIBWD0dNijNIq2u5rRllW"
   * updatedAt: "2015-12-30T16:08:50.419Z"
   *
   */
  login(data) {

  }
  /**
   * ### logOut
   * prepare the request and call _fetch
   */
  logOut() {

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
  resetPassword(data) {

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
   *  updatedAt: "2015-12-30T15:29:36.611Z"
   *  username: "barton"}
   *
   * if error, {code: xxx, error: 'message'}
   */
  getProfile() {
  }

  /**
   * ### updateProfile
   * for this user, update their record
   * the data is already in JSON format
   *
   * @param userId
   * @param data object:
   * {email: "barton@foo.com"}
   */
  updateProfile(userId, data) {
  }

}

