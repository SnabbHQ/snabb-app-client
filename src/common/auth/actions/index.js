import type { Action, Deps } from '../../types';
import * as ActionTypes from './AuthActionTypes';
import _ from 'underscore';

/**
 * TODO - Este Stuff
 */
export const resetPassword = (email: string): Action => ({
  type: 'RESET_PASSWORD',
  payload: { email },
});

export const login = (providerName: string, options?: Object): Action => ({
  type: 'SIGN_IN',
  payload: { providerName, options },
});

export const signUp = (providerName: string, options?: Object): Action => ({
  type: 'SIGN_UP',
  payload: { providerName, options },
});

/**
 * ## SessionToken actions
 */
export function sessionTokenRequest() {
  return {
    type: ActionTypes.SESSION_TOKEN_REQUEST,
  };
}

export function sessionTokenRequestSuccess(token) {
  return {
    type: ActionTypes.SESSION_TOKEN_SUCCESS,
    payload: token,
  };
}

export function sessionTokenRequestFailure(error) {
  return {
    type: ActionTypes.SESSION_TOKEN_FAILURE,
    payload: _.isUndefined(error) ? null : error,
  };
}

/**
 * ## DeleteToken actions
 */
export function deleteTokenRequest() {
  return {
    type: ActionTypes.DELETE_TOKEN_REQUEST,
  };
}
export function deleteTokenRequestSuccess() {
  return {
    type: ActionTypes.DELETE_TOKEN_SUCCESS,
  };
}
