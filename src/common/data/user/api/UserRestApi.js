// @flow
import SnabbApi from '../../../lib/SnabbApi';
import { Observable } from 'rxjs/Observable';

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
    return Observable.fromPromise(this.snabbApi.getProfile());
  }

  resetPassword(email: string) {
    return Observable.fromPromise(this.snabbApi.getProfile());
  }
}