import BackendFactory from '../../../../lib/BackendFactory'
import AppAuthToken from '../../../../lib/__mocks__/AppAuthToken'
import * as profileActions from '../actions/profileActions'

import {getUserProfile, profileUpdateSuccess, profileUpdateFailure} from "../actions/profileActions"

import * as ActionTypes from "../actions/ProfileActionTypes"
import getProfile from './getProfile'

import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/fromPromise';
import "rxjs/add/operator/switchMap"
import "rxjs/add/operator/map"
import "rxjs/add/operator/catch"

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
        .switchMap((sessionToken) => {
          return Observable.fromPromise(BackendFactory(sessionToken).updateProfile(data.userId,
            {
              name: data.newUserData.name,
              lastName: data.newUserData.lastName,
              phoneNumber: data.newUserData.phoneNumber,
              email: data.newUserData.email,
              thumbnail: data.newUserData.thumbnail
            }
          ))
        })
        .map(profileUpdateSuccess)
        .map(getUserProfile)
        .catch(profileUpdateFailure)
    )
}


// export default function updateProfile(userId, newUserData, sessionToken) {
//   return dispatch => {
//     dispatch(profileActions.profileUpdateRequest())
//     return new AppAuthToken().getSessionToken(sessionToken)
//       .then((token) => {
//         return BackendFactory(token).updateProfile(userId,
//           {
//             name: newUserData.name,
//             lastName: newUserData.lastName,
//             phoneNumber: newUserData.phoneNumber,
//             email: newUserData.email,
//             thumbnail: newUserData.thumbnail
//           }
//         )
//       })
//       .then(() => {
//         dispatch(profileActions.profileUpdateSuccess())
//         dispatch(getProfile())
//       })
//       .catch((error) => {
//         dispatch(profileActions.profileUpdateFailure(error))
//       })
//   }
// }