'use strict';

import InitialState from './deliveryInitialState';

const {
  DELIVERY_STEP_1,
  DELIVERY_STEP_2
} = require('../../lib/constants').default;

const initialState = new InitialState();

/**
 * ## locationReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function locationReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.merge(state)

  switch (action.type) {
    case DELIVERY_STEP_1:
      return state

    case DELIVERY_STEP_2:
      return state
  }

  return state
}
