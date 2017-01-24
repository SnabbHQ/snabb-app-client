// @flow
import type {Profile, Register, UpdatePassword} from '../../../types';
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

  forgotPassword(email: string) {
    return Observable.fromPromise(this.snabbApi.forgotPassword(email));
  }

  register(data: Register) {
    return Observable.fromPromise(this.snabbApi.register(convertKeys.toSnake(data)))
      .map(convertKeys.toCamel);
  }

  sendVerifyEmail(email: string) {
    return Observable.fromPromise(this.snabbApi.sendVerifyEmail(email));
  }

  updatePassword(profileId: string, data: UpdatePassword) {
    return Observable.fromPromise(this.snabbApi.updatePassword(profileId, convertKeys.toSnake(data)))
      .map(convertKeys.toCamel);
  }

  updateProfile(profileId: string, data: Profile) {
    return Observable.fromPromise(this.snabbApi.updateProfile(profileId, convertKeys.toSnake(data)))
      .map(convertKeys.toCamel);
  }

  verifyUser(hash: string) {
    return Observable.fromPromise(this.snabbApi.verifyUser(hash));
  }
}
