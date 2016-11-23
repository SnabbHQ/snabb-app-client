'use strict'

import * as ActionTypes from './DeliveryStepActionTypes';

export function goToSetPickup() {
  return dispatch => {
    dispatch({type: ActionTypes.SET_PICKUP})
  }
}

export function goToRequestPickuUp() {
  return dispatch => {
    dispatch({type: ActionTypes.REQUEST_PICKUP})
  }
}