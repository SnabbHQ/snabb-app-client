// @flow
import type {Profile} from '../../../types';
import SnabbApi from '../../../lib/SnabbApi';
import camelCaseKeys from 'camelcase-keys';
import snakeCaseKeys from  'snakecase-keys';
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
      .map(camelCaseKeys);
  }

  updateProfile(profileId: string, data: Profile) {
    return Observable.fromPromise(snakeCaseKeys(data))
      .switchMap(this.snabbApi.updateProfile(profileId, data))
      .map(camelCaseKeys);
  }

  resetPassword(email: string) {
    return Observable.fromPromise(this.snabbApi.getProfile());
  }
}
