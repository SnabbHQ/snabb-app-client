import * as ActionTypes from './ProfileActionTypes';

export function getUserProfile() {
  return {
    type: ActionTypes.GET_PROFILE_REQUEST,
  };
}

export function getProfileSuccess(json) {
  return {
    type: ActionTypes.GET_PROFILE_SUCCESS,
    payload: json,
  };
}

export function getProfileFailure(error) {
  return {
    type: ActionTypes.GET_PROFILE_FAILURE,
    payload: error,
  };
}

/**
 * ## updateProfile
 * @param {string} userId -  objectId
 * @param {Object } newUserData - the new user info
 * @param {Object} sessionToken - the sessionToken
 **/
export function updateUserProfile(userId, newUserData, sessionToken) {
  return {
    type: ActionTypes.PROFILE_UPDATE_REQUEST,
    payload: {
      data: {
        userId,
        newUserData,
        sessionToken,
      },
    },
  };
}

export function profileUpdateSuccess() {
  return {
    type: ActionTypes.PROFILE_UPDATE_SUCCESS,
  };
}

export function profileUpdateFailure(json) {
  return {
    type: ActionTypes.PROFILE_UPDATE_FAILURE,
    payload: json,
  };
}


export function onProfileFormFieldChange(field, value) {
  return {
    type: ActionTypes.ON_PROFILE_FORM_FIELD_CHANGE,
    payload: { field, value },
  };
}
