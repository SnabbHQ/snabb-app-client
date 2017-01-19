// @flow
import type {Profile, Register} from '../../../types';
import SnabbApi from '../../../lib/SnabbApi';
import convertKeys from 'convert-keys';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export default class UserRestApi {

  constructor(snabbApi: SnabbApi) {
    this.snabbApi = snabbApi;
  }

  getProfile() {
    return Observable.fromPromise(this.snabbApi.getProfile())
      .map(convertKeys.toCamel);
  }

  resetPassword(email: string) {
    return Observable.fromPromise(this.snabbApi.getProfile());
  }

  register(data: Register) {
    return Observable.fromPromise(this.snabbApi.register(convertKeys.toSnake(data)))
      .map(convertKeys.toCamel);
  }

  updateProfile(profileId: string, data: Profile) {
    return Observable.fromPromise(this.snabbApi.updateProfile(profileId, convertKeys.toSnake(data)))
      .map(convertKeys.toCamel);
  }
}
