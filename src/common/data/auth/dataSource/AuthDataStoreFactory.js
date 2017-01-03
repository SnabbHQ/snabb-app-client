// @flow
import AuthCloudDataStore from './AuthCloudDataStore';
import AuthRestApi from '../api/AuthRestApi';

export default class UserDataStoreFactory {
  authRestApi: AuthRestApi;

  constructor(authRestApi: AuthRestApi) {
    this.authRestApi = authRestApi;
  }

  create() {
    return this.createCloudDataStore();
  }

  createCloudDataStore() {
    return new AuthCloudDataStore(this.authRestApi);
  }
}
