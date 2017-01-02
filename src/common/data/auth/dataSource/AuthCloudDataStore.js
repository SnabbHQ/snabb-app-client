// @flow
import AuthDataStore from './AuthDataStore';
import AuthRestApi from '../api/AuthRestApi';
import AuthCache from '../../auth/cache/AuthCache';

import 'rxjs/add/operator/do';

class AuthCloudDataStore extends AuthDataStore {
  authRestApi: AuthRestApi;
  authCache: AuthCache;

  constructor(authRestApi: AuthRestApi, authCache: AuthCache) {
    super();

    this.authRestApi = authRestApi;
    this.authCache = authCache;
  }

  auth(username: string, password: string) {
    return this.authRestApi.auth(username, password)
      .do(token => this.authCache.storeSessionToken(token));
  }
}

export default AuthCloudDataStore;
