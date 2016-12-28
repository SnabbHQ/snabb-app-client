// @flow
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
  register(data) {}

 /**
   * ### logIn
   * encode the data and and call _fetch
   */
  auth(data) {}

  /**
   * ### logOut
   * prepare the request and call _fetch
   */
  logOut() {}

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
  resetPassword(data) {}

  /**
   * ### getProfile*
   * Using the sessionToken, we'll get everything about
   * the current user.
   */
  getProfile() {}

  /**
   * ### updateProfile
   * for this user, update their record
   * the data is already in JSON format
   *
   * @param userId
   * @param data object:
   * {email: "barton@foo.com"}
   */
  updateProfile(userId, data) {}
}

