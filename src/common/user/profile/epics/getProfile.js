// @flow
import type { Deps } from '../../../types';

import { getProfileSuccess, getProfileFailure } from '../actions';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/**
 * Epic fetching the user profile when the action GET_PROFILE gets fired.
 *
 * In order to do so, this epic will fetch the auth sessionToken previously in order to communicate
 * with the server.
 *
 * @return {Observable<R|I>}
 */
const getProfile = (action$: any, { backendFactory, appAuthToken }: Deps) =>
  action$.ofType('GET_PROFILE_REQUEST')
    .switchMap(() =>
      Observable.fromPromise(appAuthToken.getSessionToken())
        .switchMap(Observable.fromPromise(backendFactory.getProfile()))
        .map(getProfileSuccess)
        .catch(error => Observable.of(
          getProfileFailure(error),
        )),
    );

export default getProfile;
