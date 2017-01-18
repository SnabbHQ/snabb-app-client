/* @flow */
import type { Action, Profile } from '../../types';


export const getProfile = (): Action => ({
  type: 'GET_PROFILE',
});

export const getProfileSuccess = (profile: Profile): Action => ({
  type: 'GET_PROFILE_SUCCESS',
  payload: {
    profile: { profile },
  },
});

export const getProfileFail = (error: Error): Action => ({
  type: 'GET_PROFILE_FAIL',
  payload: { error },
});

export function updateUserProfile(userId, newUserData) {
  return {
    type: 'PROFILE_UPDATE',
    payload: {
      data: {
        userId,
        newUserData,
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
