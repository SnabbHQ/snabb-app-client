// @flow
import AuthDataStore from './AuthDataStore';
import AuthRestApi from '../api/AuthRestApi';

class AuthCloudDataStore extends AuthDataStore {
  authRestApi: AuthRestApi;

  constructor(authRestApi: AuthRestApi) {
    super();

    this.authRestApi = authRestApi;
  }

  auth(username: string, password: string) {
    return this.authRestApi.auth(username, password);
  }

  getToken() {
    throw ('Operation not supported!')
  }

  logout() {
    return this.authRestApi.logout();
  }
}

export default AuthCloudDataStore;
