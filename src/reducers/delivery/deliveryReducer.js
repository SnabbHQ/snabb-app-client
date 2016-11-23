'use strict';

import InitialState from './deliveryInitialState';
import * as ActionTypes from './DeliveryStepActionTypes';

const initialState = new InitialState();

/**
 * ## deliveryStepReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function deliveryStepReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.merge(state)

  switch (action.type) {
    case ActionTypes.SET_PICKUP:
      return state.setIn(['step'], ActionTypes.SET_PICKUP)

    case ActionTypes.REQUEST_PICKUP:
      return state.setIn(['step'], ActionTypes.REQUEST_PICKUP)

    case ActionTypes.RESET:
      return initialState
  }

  return state
}
