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
 * Epic validating if a given address is valid or not in order to request either a quote or perform a delivery.
 *
 * @return {Observable<R|I>}
 */
const validateAddress = (action$: any, { deliveryRepository }: Deps) =>
  action$.ofType('VALIDATE_ADDRESS')
    .map(action => action.payload.options)
    .mergeMap((options) => {
      const { place } = options;
      return deliveryRepository.validateAddress(place.address)
        .map(() => validateAddressSuccess(place))
        .catch(error => Observable.of(validateAddressFail(place.placeType, error)));
    });

export default validateAddress;
