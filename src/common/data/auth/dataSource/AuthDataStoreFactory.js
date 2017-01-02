// @flow
import AuthCloudDataStore from './AuthCloudDataStore';
import AuthLocalDataStore from './AuthLocalDataStore';
import AuthRestApi from '../api/AuthRestApi';
import AuthCache from '../cache/AuthCache';
import AuthLocalCache from '../cache/AuthLocalStoreCache';
import SnabbApi from '../../../lib/SnabbApi';

export default class UserDataStoreFactory {
  authRestApi: AuthRestApi;
  authCache: AuthCache;

  constructor() {
    // TODO - Lets start without DI
    this.authRestApi = new AuthRestApi(new SnabbApi());
    this.authCache = new AuthLocalCache(window.localStorage);
  }

  create() {
    return this.createCloudDataStore();
  }

  createCloudDataStore() {
    return new AuthCloudDataStore(this.authRestApi, this.authCache);
  }

  createLocalDataStore() {
    return new AuthLocalDataStore(this.authCache);
  }
}
