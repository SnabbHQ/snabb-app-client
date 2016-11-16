'use strict';

import * as Defaults from './locationConstants'
import Geocoder from 'react-native-geocoder';

Geocoder.fallbackToGoogle('AIzaSyBodeCxWCFMML6JvWL8MW6ztpHJZBN8KTw');

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
          longitude: position.coords.longitude,
          latitudeDelta: Defaults.LATITUDE_DELTA,
          longitudeDelta: Defaults.LONGITUDE_DELTA
        }))
      },
      (error) => console.log(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }
}

export function geoCodePosition(location) {
  console.log(location)
  return Geocoder.geocodePosition({
      lat: location.latitude,
      lng: location.longitude
    }
  ).catch((error) => {
    console.log(error)
    throw (error)
  })
}

/**
 * ## Set the pickup location
 */
export function setPickupLocation(location) {
  return dispatch => {
    return geoCodePosition(location)
      .then((res) => {
        location.address = res[0].feature
        dispatch(pickupLocationSetSuccess(location))
      })
      .catch(() => pickupLocationSetSuccess(location))
  }
}

export function pickupLocationSetSuccess(location) {
  console.log(location)
  return {
    type: SET_PICKUP_LOCATION,
    payload: {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: location.latitudeDelta,
      longitudeDelta: location.longitudeDelta,
      address: location.address
    }
  }
}

/**
 * ## set the delivery location
 */
export function setDeliveryLocation(location) {
  return {
    type: SET_DELIVERY_LOCATION,
    payload: {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: location.latitudeDelta,
      longitudeDelta: location.longitudeDelta,
      address: location.address
    }
  }
}

export function currentPosition(position) {
  return {
    type: CURRENT_POSITION,
    payload: position
  }
}
