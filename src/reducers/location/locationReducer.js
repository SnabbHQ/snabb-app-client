'use strict';

import InitialState from './locationInitialState';

const {
  CURRENT_POSITION,
  SET_PICKUP_LOCATION,
  SET_DELIVERY_LOCATION
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

    case CURRENT_POSITION:
    case SET_PICKUP_LOCATION:
      var next = state.set('pickupLocation', action.payload.location)
                      .set('from', action.payload.from)
      return next


    case SET_DELIVERY_LOCATION:
      return state.set('deliveryLocation', action.payload)
  }

  return state
}
