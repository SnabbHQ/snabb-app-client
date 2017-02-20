// @flow
import SnabbApi from '../../../lib/api/SnabbApi';
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

  validateAddress(address: string) {
    return Observable.fromPromise(this.snabbApi.validateAddress(address))
      .map(convertKeys.toCamel);
  }
}
