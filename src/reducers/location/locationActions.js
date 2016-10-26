'use strict';

/**
 * The actions supported
 */
const {
  SET_PICKUP_LOCATION,
  SET_DELIVERY_LOCATION
} = require('../../lib/constants').default;

/**
 * ## Set the pickup location
 */
export function setPickupLocation (location) {
  return {
    type: SET_PICKUP_LOCATION,
    payload: location
  }
}
/**
 * ## set the delivery location
 */
export function setDeliveryLocation (location) {
  return {
    type: SET_DELIVERY_LOCATION,
    payload: location
  }
}
