import * as ActionTypes from './AuthActionTypes'
import _ from 'underscore'

/**
 * ## SessionToken actions
 */
export function sessionTokenRequest() {
  return {
    type: ActionTypes.SESSION_TOKEN_REQUEST
  }
}

export function sessionTokenRequestSuccess(token) {
  return {
    type: ActionTypes.SESSION_TOKEN_SUCCESS,
    payload: token
  }
}

export function sessionTokenRequestFailure(error) {
  return {
    type: ActionTypes.SESSION_TOKEN_FAILURE,
    payload: _.isUndefined(error) ? null : error
  }
}

/**
 * ## DeleteToken actions
 */
export function deleteTokenRequest() {
  return {
    type: ActionTypes.DELETE_TOKEN_REQUEST
  }
}
export function deleteTokenRequestSuccess() {
  return {
    type: ActionTypes.DELETE_TOKEN_SUCCESS
  }
}