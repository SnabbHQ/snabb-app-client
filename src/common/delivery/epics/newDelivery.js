// @flow
import type { Deps } from '../../types';
import { createQuoteSuccess, createQuoteFail} from '../actions';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const createTask = (place) => {
  return {
    type: place.placeType,
    place: {
      description: "This is a place",
      address: place.address
    }
  };
};

/**
 * Epic in charge of ordering a new delivery given the quote already created by the user and the selected package
 * size id:
 *
 * @return {Observable<R|I>}
 */
const newDelivery = (action$: any, { deliveryRepository }: Deps) =>
  action$.ofType('NEW_DELIVERY')
    .map(action => action.payload.options)
    .mergeMap((options) => {
      const { quoteId, selectedPackageId } = options;

      return deliveryRepository.createQuote(tasks)
        .map(createQuoteSuccess)
        .catch(error => Observable.of(createQuoteFail(error)));
    });

export default createQuote;
