import BackendFactory from '../../../../lib/BackendFactory'
import AppAuthToken from '../../../../lib/__mocks__/AppAuthToken'
import * as profileActions from '../actions/profileActions'
import getProfile from './getProfile'

/**
 * ## updateProfile
 * @param {string} userId -  objectId
 * @param {Object } newUserData - the new user info
 * @param {Object} sessionToken - the sessionToken
 *
 * The sessionToken is provided when Hot Loading.
 *
 * With the sessionToken, the server is called with the data to update
 * If successful, get the profile so that the screen is updated with
 * the data as now persisted on the serverx
 *
 */
export default function updateProfile(userId, newUserData, sessionToken) {
  return dispatch => {
    dispatch(profileActions.profileUpdateRequest())
    return new AppAuthToken().getSessionToken(sessionToken)
      .then((token) => {
        return BackendFactory(token).updateProfile(userId,
          {
            name: newUserData.name,
            lastName: newUserData.lastName,
            phoneNumber: newUserData.phoneNumber,
            email: newUserData.email,
            thumbnail: newUserData.thumbnail
          }
        )
      })
      .then(() => {
        dispatch(profileActions.profileUpdateSuccess())
        dispatch(getProfile())
      })
      .catch((error) => {
        dispatch(profileActions.profileUpdateFailure(error))
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