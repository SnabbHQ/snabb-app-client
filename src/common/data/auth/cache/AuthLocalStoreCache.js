import AuthCache from './AuthCache';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/fromPromise';

const TOKEN_KEY = 'SESSION_TOKEN_KEY';

class AuthLocalStoreCache extends AuthCache {

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
        .then(() => Observable.fromPromise(
          JSON.parse(this.localStorage.getItem(this.SESSION_TOKEN_KEY)))
        );
    }
    return Observable.fromPromise(JSON.parse(this.localStore.getItem(this.SESSION_TOKEN_KEY)));
  }

  /**
   * ### deleteSessionToken
   * Deleted during log out
   */
  deleteSessionToken() {
    return this.localStore.removeItem(this.SESSION_TOKEN_KEY);
  }


  isCached() {
    return Observable.fromPromise(this.localStore.getItem(this.SESSION_TOKEN_KEY))
      .map(token => !!token);
  }


  isValid() {
    // TODO - We should make sure that the token expires_in is correctly computer but return this
    // for now.
    return this.isCached();
  }
}

export default AuthLocalStoreCache;
