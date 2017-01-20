/* @flow */
import type { Action, Profile } from '../types';

export const forgotPassword = (options?: string): Action => ({
  type: 'FORGOT_PASSWORD',
  payload: { options },
});

export const forgotPasswordSuccess = (): Action => ({
  type: 'FORGOT_PASSWORD_SUCCESS',
});

export const forgotPasswordFail = (error: Error): Action => ({
  type: 'FORGOT_PASSWORD_FAIL',
  payload: { error },
});

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

export const updatePassword = (profileId: string, options: Object): Action => ({
  type: 'PASSWORD_UPDATE',
  payload: { profileId, options }
});

export const updatePasswordSuccess = (profile: Profile): Action => ({
  type: 'PASSWORD_UPDATE_SUCCESS',
  payload: { profile },
});

export const updatePasswordFail = (error: Error): Action => ({
  type: 'PASSWORD_UPDATE_FAIL',
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
