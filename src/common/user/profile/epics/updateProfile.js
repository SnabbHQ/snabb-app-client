// @flow
import type { Deps } from '../../../types';

import { profileUpdateSuccess, profileUpdateFailure } from '../actions';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/**
 * The sessionToken is provided when Hot Loading.
 *
 * With the sessionToken, the server is called with the data to update
 * If successful, get the profile so that the screen is updated with
 * the data as now persisted on the server
 *
 */
const updateProfile = (action$: any, { backendFactory, appAuthToken, validate }: Deps) =>
  action$.ofType('PROFILE_UPDATE')
    .map(action => action.payload.data)
    .switchMap((data) =>
      Observable.fromPromise(appAuthToken.getSessionToken(data.sessionToken))
        .switchMap(Observable.fromPromise(backendFactory.updateProfile(data.userId, {
            name: data.newUserData.name,
            lastName: data.newUserData.lastName,
            phoneNumber: data.newUserData.phoneNumber,
            email: data.newUserData.email,
            thumbnail: data.newUserData.thumbnail,
          }),
        ))
        .map(profileUpdateSuccess)
        .catch(error => Observable.of(
          profileUpdateFailure(error),
        )),
    );

export default updateProfile;

