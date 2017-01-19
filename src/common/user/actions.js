/* @flow */
import type { Action, Profile } from '../types';

export const getProfile = (): Action => ({
  type: 'GET_PROFILE',
});

export const getProfileSuccess = (profile: Profile): Action => ({
  type: 'GET_PROFILE_SUCCESS',
  payload: { profile },
});

export const getProfileFail = (error: Error): Action => ({
  type: 'GET_PROFILE_FAIL',
  payload: { error },
});

export const register = (providerName: string, options?: Object): Action => ({
  type: 'REGISTER',
  payload: { providerName, options },
});

export const registerSuccess = (profile: Profile): Action => ({
  type: 'REGISTER_SUCCESS',
  payload: { profile },
});

export const registerFail = (error: Error): Action => ({
  type: 'REGISTER_FAIL',
  payload: { error },
});

export const resetPassword = (options?: string): Action => ({
  type: 'RESET_PASSWORD',
  payload: { options },
});

export const resetPasswordSuccess = (): Action => ({
  type: 'RESET_PASSWORD_SUCCESS',
});

export const resetPasswordFail = (error: Error): Action => ({
  type: 'RESET_PASSWORD_FAIL',
  payload: { error },
});

export const updateProfile = (profileId: string, options: Object): Action => ({
  type: 'PROFILE_UPDATE',
  payload: { profileId, options }
});

export const updateProfileSuccess = (profile: Profile): Action => ({
  type: 'PROFILE_UPDATE_SUCCESS',
  payload: { profile },
});

export const updateProfileFail = (error: Error): Action => ({
  type: 'PROFILE_UPDATE_FAIL',
  payload: { error },
});
