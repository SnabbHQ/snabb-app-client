// @flow
import type { Deps } from '../../types';

import { validateAddressSuccess, validateAddressFail} from '../actions';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

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
      const { pickupAddress, dropOffAddress, packageSize } = options;
      return deliveryRepository.validateAddress(address)
        .map(validateAddressSuccess)
        .catch(error => Observable.of(validateAddressFail(error)));
    });

export default createQuote;
