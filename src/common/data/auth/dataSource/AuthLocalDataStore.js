// @flow
import AuthDataStore from './AuthDataStore';
import AuthCache from '../../auth/cache/AuthCache';

class AuthLocalDataStore extends AuthDataStore {
  authCache: AuthCache;

  constructor(authCache: AuthCache) {
    super();

    this.authCache = authCache;
  }

  getToken() {
    return this.authCache.getSessionToken();
  }
}

export default AuthLocalDataStore;
