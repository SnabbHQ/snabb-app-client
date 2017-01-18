/* @flow */
import type { Action, Profile } from '../types';

export const login = (options?: Object): Action => ({
  type: 'LOG_IN',
  payload: { options },
});

export const loginSuccess = (profile: Profile): Action => ({
  type: 'LOG_IN_SUCCESS',
  payload: { profile },
});

export const loginFail = (error: Error): Action => ({
  type: 'LOG_IN_FAIL',
  payload: { error },
});

export const logOut = (): Action => ({
  type: 'LOG_OUT',
});

export const logOutSuccess = (): Action => ({
  type: 'LOG_OUT_SUCCESS',
});

export const register = (providerName: string, options?: Object): Action => ({
  type: 'REGISTER',
  payload: { providerName, options },
});

export const registerSuccess = (user: User): Action => ({
  type: 'REGISTER_SUCCESS',
  payload: { user },
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

export const resetAuthState = (): Action => ({
  type: 'RESET_AUTH_STATE',
});
