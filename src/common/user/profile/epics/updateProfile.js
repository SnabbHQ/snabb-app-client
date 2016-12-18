import BackendFactory from '../../../lib/BackendFactory';
import AppAuthToken from '../../../lib/__mocks__/AppAuthToken';
import { getUserProfile, profileUpdateSuccess, profileUpdateFailure } from '../actions/profileActions';
import * as ActionTypes from '../actions/ProfileActionTypes';
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
 * the data as now persisted on the serverx
 *
 */
export default function updateProfile(action$) {
  return action$.ofType(ActionTypes.PROFILE_UPDATE_REQUEST)
    .map(action => action.payload.data)
    .switchMap((data) =>
      Observable.fromPromise(new AppAuthToken().getSessionToken(data.sessionToken))
        .switchMap((sessionToken) => Observable.fromPromise(BackendFactory(sessionToken).updateProfile(data.userId,
          {
            name: data.newUserData.name,
            lastName: data.newUserData.lastName,
            phoneNumber: data.newUserData.phoneNumber,
            email: data.newUserData.email,
            thumbnail: data.newUserData.thumbnail,
          },
          )))
        .map(profileUpdateSuccess)
        .catch(error => Observable.of(
          profileUpdateFailure(error),
        )),
    );
}
