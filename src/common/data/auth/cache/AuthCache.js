export default class AuthCache {
  /**
   * ### storeSessionToken
   * Store the session key
   */
  storeSessionToken(sessionToken) {}

  /**
   * ### getSessionToken
   * @param {Object} sessionToken the currentUser object
   *
   * When Hot Loading, the sessionToken  will be passed in, and if so,
   * it needs to be stored on the device.  Remember, the store is a
   * promise so, have to be careful.
   */
  getSessionToken(sessionToken) {}

  /**
   * ### deleteSessionToken
   * Deleted during log out
   */
  deleteSessionToken() {}

  isCached() {}

  isValid() {}
}
