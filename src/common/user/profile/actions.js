export function getUserProfile() {
  return {
    type: 'GET_PROFILE',
  };
}

export function getProfileSuccess(json) {
  return {
    type: 'GET_PROFILE_SUCCESS',
    payload: json,
  };
}

export function getProfileFailure(error) {
  return {
    type: 'GET_PROFILE_FAIL',
    payload: error,
  };
}

export function updateUserProfile(userId, newUserData, sessionToken) {
  return {
    type: 'PROFILE_UPDATE',
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
    type: 'PROFILE_UPDATE_SUCCESS',
  };
}

export function profileUpdateFailure(json) {
  return {
    type: 'PROFILE_UPDATE_FAIL',
    payload: json,
  };
}


export function onProfileFormFieldChange(field, value) {
  return {
    type: 'ON_PROFILE_FORM_FIELD_CHANGE',
    payload: { field, value },
  };
}
