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


import { Record } from 'immutable';
import * as Defaults from './locationConstants';

/**
 * ## InitialState
 *
 * The fields we're concerned with
 */
const InitialState = Record({
  from: '',
  pickupLocation: {
    latitude: Defaults.LATITUDE,
    longitude: Defaults.LONGITUDE,
    address: '',
  },
  deliveryLocation: {
    latitude: 0,
    longitude: 0,
    address: '',
  },
});

export default InitialState;
