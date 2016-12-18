

import * as Defaults from './locationConstants';
import Geocoder from 'react-native-geocoder';

Geocoder.fallbackToGoogle('AIzaSyBodeCxWCFMML6JvWL8MW6ztpHJZBN8KTw');

/**
 * The actions supported
 */
const {
  CURRENT_POSITION,
  SET_PICKUP_LOCATION,
  SET_DELIVERY_LOCATION,
} = require('../../common/lib/constants').default;


/**
 * Gets the user's current position
 */
export function getCurrentPosition() {
  return dispatch => navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(currentPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      },
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
}

export function geoCodePosition(location) {
  return Geocoder.geocodePosition({
    lat: location.latitude,
    lng: location.longitude,
  },
  ).catch((error) => {
    console.log(error);
    throw (error);
  });
}

export function setPickupLocation(location, from) {
  return dispatch => geoCodePosition(location)
      .then((res) => {
        location.address = res[0].feature;
        dispatch(pickupLocationSetSuccess(location, from));
      })
      .catch(() => pickupLocationSetSuccess(location));
}

export function pickupLocationSetSuccess(location, from) {
  console.log(location);
  return {
    type: SET_PICKUP_LOCATION,
    payload: {
      location,
      from,
    },
  };
}

/**
 * ## set the delivery location
 */
export function setDeliveryLocation(location) {
  return {
    type: SET_DELIVERY_LOCATION,
    payload: location,
  };
}

export function currentPosition(position) {
  return {
    type: CURRENT_POSITION,
    payload: {
      location: position,
    },
  };
}
