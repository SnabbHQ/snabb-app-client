import BackendFactory from '../../../../lib/BackendFactory'
import AppAuthToken from '../../../../lib/__mocks__/AppAuthToken'
import * as profileActions from '../actions/profileActions'

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export default function getProfile() {
  return dispatch => {
    dispatch(profileActions.getProfileRequest());
    // store or get a sessionToken
    return new AppAuthToken().getSessionToken()
      .then((token) => {
        return BackendFactory(token).getProfile()
      })
      .then((json) => {
        dispatch(profileActions.getProfileSuccess(json))
      })
      .catch((error) => {
        dispatch(profileActions.getProfileFailure(error))
        throw (error)
      })
  }
}

// import * as UserActionTypes from '../actions/ProfileActionTypes'
// import * as AuthActionTypes from '../../auth/actions/AuthActionTypes'
// import { sessionTokenRequestSuccess, sessionTokenRequestFailure  } from '../../auth/actions'
//
// import 'rxjs/add/operator/switchMap'
// import 'rxjs/add/operator/map'

// export default function getProfile(action$) {
//   return action$.ofType(UserActionTypes.GET_PROFILE_REQUEST)
//     .map(action => action.payload.sessionToken)
//     .switchMap(sessionToken =>
//       new AppAuthToken().getSessionToken()
//         .map(sessionTokenRequestSuccess.bind(null, sessionToken))
//         .map((sessionToken) => {
//           return BackendFactory(sessionToken).getProfile()
//         })
//         .catch(sessionTokenRequestFailure.bind(null, error))
//         .map(fetchProfileSuccess.bind(null, profile))
//         .catch(fetchProfileError.bind(null, error))
//     )
// }