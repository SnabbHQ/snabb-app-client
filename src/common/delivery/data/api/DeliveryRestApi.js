// @flow
import SnabbApi from '../../../lib/api/SnabbApi';
import convertKeys from 'convert-keys';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export default class DeliveryRestApi {

  constructor(snabbApi: SnabbApi) {
    this.snabbApi = snabbApi;
  }

  createQuote(tasks: Array<Object>) {
    return Observable.fromPromise(this.snabbApi.createQuote(convertKeys.toSnake(tasks)))
      .map(convertKeys.toCamel);
  }

  newDelivery(quoteId: string, selectedPackageId: string) {
    return Observable.fromPromise(this.snabbApi.newDelivery(quoteId, selectedPackageId))
      .map(convertKeys.toCamel);
  }

  validateAddress(address: string) {
    return Observable.fromPromise(this.snabbApi.validateAddress(address))
      .map(convertKeys.toCamel);
  }
}
