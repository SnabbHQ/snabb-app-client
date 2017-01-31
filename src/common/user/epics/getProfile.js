// @flow
import type { Deps } from '../../types';

import { getProfileSuccess, getProfileFail } from '../actions';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/**
 * Epic fetching the user profile when the action GET_PROFILE gets fired.
 *
 * @return {Observable<R|I>}
 */
const getProfile = (action$: any, { userRepository }: Deps) =>
  action$.ofType('GET_PROFILE')
    .mergeMap(() => userRepository.getProfile()
        .map(getProfileSuccess)
        .catch(error => Observable.of(getProfileFail(error))));

export default getProfile;
