import BackendFactory from "../../../../lib/BackendFactory"
import AppAuthToken from "../../../../lib/__mocks__/AppAuthToken"

import {getProfileSuccess, getProfileFailure} from "../actions/profileActions"
import * as ActionTypes from "../actions/ProfileActionTypes"

import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/fromPromise';
import "rxjs/add/operator/filter"
import "rxjs/add/operator/switchMap"
import "rxjs/add/operator/map"
import "rxjs/add/operator/mapTo"
import "rxjs/add/operator/catch"

export default function getProfile(action$) {
  return action$.ofType(ActionTypes.GET_PROFILE_REQUEST)
    .switchMap(() =>
      Observable.fromPromise(new AppAuthToken().getSessionToken())
      .switchMap((sessionToken) => {
        return Observable.fromPromise(BackendFactory(sessionToken).getProfile())
      })
      .map((profile) => {
        return getProfileSuccess.bind(null, profile)
      })
      .catch((error) => {
        getProfileFailure.bind(null, error)
      }))
}


// /**
//  * ## State actions
//  * controls which form is displayed to the user
//  * as in login, register, logout or reset password
//  */
// export default function getProfile() {
//   return dispatch => {
//     dispatch(profileActions.getProfileRequest());
//     // store or get a sessionToken
//     return new AppAuthToken().getSessionToken()
//       .then((token) => {
//         return BackendFactory(token).getProfile()
//       })
//       .then((json) => {
//         dispatch(profileActions.getProfileSuccess(json))
//       })
//       .catch((error) => {
//         dispatch(profileActions.getProfileFailure(error))
//         throw (error)
//       })
//   }
// }

