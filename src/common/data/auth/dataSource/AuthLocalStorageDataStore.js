// @flow
import AuthDataStore from './AuthDataStore';
import AuthRestApi from '../api/AuthRestApi';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/fromPromise';

class AuthLocalStorageDataStore extends AuthDataStore {
  authRestApi: AuthRestApi;

  constructor(storageEngine) {
    super();

    this.storageEngine = storageEngine;
  }

  auth(username: string, password: string) {
    throw ('Operation not supported!')
  }

  getToken() {
    return Observable.fromPromise(this.storageEngine.getItem('Snabb:sessionData'));
  }

  logout() {
    throw ('Operation not supported!')
  }
}

export default AuthLocalStorageDataStore;
