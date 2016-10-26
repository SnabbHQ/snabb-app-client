'use strict';

import InitialState from './locationInitialState';


const {
  SET_PICKUP_LOCATION,
  SET_DELIVERY_LOCATION
} = require('../../../../lib/constants').default;

const initialState = new InitialState();

/**
 * ## locationReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function locationReducer (state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.merge(state)

  switch (action.type) {
    /**
     * Set the pickup location in the state
     */
    case SET_PICKUP_LOCATION:
      const platform = action.payload;
      return state.set('pickup_location', platform)

    /**
     * Set the delivery location in the state
     */
    case SET_DELIVERY_LOCATION:
      const version = action.payload;
      return state.set('delivery_location', version)
  }

  return state
}
