'use strict';

/**
 * The actions supported
 */
const {
  CURRENT_POSITION,
  SET_PICKUP_LOCATION,
  SET_DELIVERY_LOCATION
} = require('../../lib/constants').default;

/**
 * Gets the user's current position
 */
export function getCurrentPosition() {
  return dispatch => {
    return navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(currentPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }))
      },
      (error) => console.log(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }
}

export function currentPosition(position) {
  return {
    type: CURRENT_POSITION,
    payload: position
  }
}

/**
 * ## Set the pickup location
 */
export function setPickupLocation(location) {
  return dispatch => {
    dispatch(setPickupLocationRequest(location))
  }
}

export function setPickupLocationRequest(location) {
  return {
    type: SET_PICKUP_LOCATION,
    payload: location
  }
}

/**
 * ## set the delivery location
 */
export function setDeliveryLocation (location) {
  return dispatch => {
    dispatch({
      type: SET_DELIVERY_LOCATION,
      payload: location
    })
  }
}
