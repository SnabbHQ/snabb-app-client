import * as ActionTypes from './ProfileActionTypes';

export function getProfileRequest(sessionToken) {
  return {
    type: ActionTypes.GET_PROFILE_REQUEST,
    payload: {
      sessionToken
    }
  }
}

export function getProfileSuccess(json) {
  return {
    type: ActionTypes.GET_PROFILE_SUCCESS,
    payload: json
  };
}

export function getProfileFailure(json) {
  return {
    type: ActionTypes.GET_PROFILE_FAILURE,
    payload: json
  };
}

export function profileUpdateRequest () {
  return {
    type: ActionTypes.PROFILE_UPDATE_REQUEST
  }
}

export function profileUpdateSuccess () {
  return {
    type: ActionTypes.PROFILE_UPDATE_SUCCESS
  }
}

export function profileUpdateFailure (json) {
  return {
    type: ActionTypes.PROFILE_UPDATE_FAILURE,
    payload: json
  }
}


export function onProfileFormFieldChange(field, value) {
  return {
    type: ActionTypes.ON_PROFILE_FORM_FIELD_CHANGE,
    payload: {field: field, value: value}
  }
}
