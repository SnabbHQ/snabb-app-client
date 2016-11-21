/**
 * # profileActions.js
 *
 * The actions to support the users profile
 */
'use strict'

import * as Actions from './actions'

/**
 * BackendFactory - base class for server implementation
 * AppAuthToken for localStorage sessionToken access
 */
const BackendFactory = require('../../../lib/BackendFactory').default;
const AppAuthToken = require('../../../lib/__mocks__/AppAuthToken').default;

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getProfile (sessionToken) {
  return dispatch => {
    dispatch(Actions.getProfileRequest());
    // store or get a sessionToken
    return new AppAuthToken().getSessionToken(sessionToken)
      .then((token) => {
        return BackendFactory(token).getProfile()
      })
      .then((json) => {
        dispatch(Actions.getProfileSuccess(json))
      })
      .catch((error) => {
        dispatch(Actions.getProfileFailure(error))
        throw (error)
      })
  }
}

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
export function updateProfile (userId, newUserData, sessionToken) {
  return dispatch => {
    dispatch(Actions.profileUpdateRequest())
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
        dispatch(Actions.profileUpdateSuccess())
        dispatch(getProfile())
      })
      .catch((error) => {
        dispatch(Actions.profileUpdateFailure(error))
      })
  }
}