import AuthCache from './AuthCache';
// This storage not only works with RN but by normal browser as well.
// import store from 'react-native-simple-store';

const TOKEN_KEY = 'SESSION_TOKEN_KEY';

class AuthLocalCache extends AuthCache {

  constructor(localStore) {
    super();

    this.localStore = localStore;
    this.SESSION_TOKEN_KEY = TOKEN_KEY;
  }

  /**
   * ### storeSessionToken
   * Store the session key
   */
  storeSessionToken(sessionToken) {
    return this.localStore.setItem(this.SESSION_TOKEN_KEY, JSON.stringify(sessionToken));
  }

  /**
   * ### getSessionToken
   * @param {Object} sessionToken the currentUser object
   *
   * When Hot Loading, the sessionToken  will be passed in, and if so,
   * it needs to be stored on the device.  Remember, the store is a
   * promise so, have to be careful.
   */
  getSessionToken(sessionToken) {
    if (sessionToken) {
      return this.storeSessionToken(sessionToken)
        .then(() => JSON.parse(this.localStorage.getItem(this.SESSION_TOKEN_KEY)));
    }
    return JSON.parse(this.localStore.getItem(this.SESSION_TOKEN_KEY));
  }

  /**
   * ### deleteSessionToken
   * Deleted during log out
   */
  deleteSessionToken() {
    return this.localStore.removeItem(this.SESSION_TOKEN_KEY);
  }
}

export default AuthLocalCache;
