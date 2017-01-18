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

export const updateProfile = (profileId: string, options: Object): Action => ({
  type: 'PROFILE_UPDATE',
  payload: { profileId, options }
});

export const updateProfileSuccess = (profile: Profile): Action => ({
  type: 'PROFILE_UPDATE_SUCCESS',
  payload: {
    profile: { profile },
  },
});

export const updateProfileFail = (error: Error): Action => ({
  type: 'PROFILE_UPDATE_FAIL',
  payload: { error },
});
