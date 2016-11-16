/**
 * # locationInitialState.js
 *
 * This class is a Immutable object
 * Working *successfully* with Redux, requires
 * state that is immutable.
 * In my opinion, that can not be by convention
 * By using Immutable, it's enforced.  Just saying....
 *
 */
'use strict';

import {Record} from 'immutable'
import * as Defaults from './locationConstants'

/**
 * ## InitialState
 *
 * The fields we're concerned with
 */
var InitialState = Record({
  pickupLocation: {
    latitude: Defaults.LATITUDE,
    longitude: Defaults.LONGITUDE,
    latitudeDelta: Defaults.LATITUDE_DELTA,
    longitudeDelta: Defaults.LONGITUDE_DELTA,
    address: ''
  },
  deliveryLocation: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
    address: ''
  }
});

export default InitialState
