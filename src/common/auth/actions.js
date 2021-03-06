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
