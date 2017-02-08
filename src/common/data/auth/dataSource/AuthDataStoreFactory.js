// @flow
import AuthCloudDataStore from './AuthCloudDataStore';
import AuthLocalStorageStore from './AuthLocalStorageDataStore';
import AuthRestApi from '../api/AuthRestApi';

export default class UserDataStoreFactory {
  authRestApi: AuthRestApi;

  constructor(authRestApi: AuthRestApim, storageEngine) {
    this.authRestApi = authRestApi;
    this.storageEngine = storageEngine;
  }

  create() {
    return this.createCloudDataStore();
  }

  createCloudDataStore() {
    return new AuthCloudDataStore(this.authRestApi);
  }

  createLocalStorageDataStore() {
    return new AuthLocalStorageStore(this.storageEngine);
  }
}
