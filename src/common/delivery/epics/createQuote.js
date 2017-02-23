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
 * Epic in charge of creating quotes given the following details given by the user:
 *
 * - Pickup Address
 * - DropOff Address
 * - Packages Size
 *
 * @return {Observable<R|I>}
 */
const createQuote = (action$: any, { deliveryRepository }: Deps) =>
  action$.ofType('CREATE_QUOTE')
    .map(action => action.payload.options)
    .mergeMap((options) => {
      const { pickUpPlace, dropOffPlace } = options;

      let tasks = [];
      tasks.push(createTask(pickUpPlace));
      tasks.push(createTask(dropOffPlace));

      return deliveryRepository.createQuote(tasks)
        .map(createQuoteSuccess)
        .catch(error => Observable.of(createQuoteFail(error)));
    });

export default createQuote;
