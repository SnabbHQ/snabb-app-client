'use strict'

/**
 * The actions supported
 */
const {
  DELIVERY_SET_PICKUP,
  DELIVERY_REQUEST
} = require('../../lib/constants').default


/**
 * Go to step 1 of the delivery process
 */

/**
 * ## goToStep1
 * After dispatching the goToStep1, get go the the next screen
 * in the process.
 *
 * The reason behind this is that any other view which might be interested in the current state of the delivery
 * process can update its own state based upon this.
 */
export function setPickupState() {
  return dispatch => {
    dispatch({type: DELIVERY_SET_PICKUP})
  }
}

/**
 * Go to step 2 of the delivery process
 */
export function requestDeliveryState() {
  return dispatch => {
    dispatch({type: DELIVERY_REQUEST})
  }
}