'use strict'

import * as ActionTypes from './DeliveryStepActionTypes';

export function resetDelivery() {
  return dispatch => {
    dispatch({type: ActionTypes.RESET})
  }
}

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