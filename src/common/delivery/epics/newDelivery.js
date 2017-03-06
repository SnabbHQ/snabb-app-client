// @flow
import type { Deps } from '../../types';
import { newDeliverySuccess, newDeliveryFail} from '../actions';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

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

      return deliveryRepository.newDelivery(quoteId, selectedPackageId)
        .map(newDeliverySuccess)
        .catch(error => Observable.of(newDeliveryFail(error)));
    });

export default newDelivery;
