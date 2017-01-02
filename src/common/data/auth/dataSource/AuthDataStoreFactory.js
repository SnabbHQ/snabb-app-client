// @flow
import AuthCloudDataStore from './AuthCloudDataStore';
import AuthRestApi from '../api/AuthRestApi';
import SnabbApi from '../../../lib/SnabbApi';

export default class UserDataStoreFactory {
  authRestApi: AuthRestApi;

  constructor() {
    // TODO - Lets start without DI
    this.authRestApi = new AuthRestApi(new SnabbApi());
  }

  create() {
    return this.createCloudDataStore();
  }

  createCloudDataStore() {
    return new AuthCloudDataStore(this.authRestApi);
  }
}
