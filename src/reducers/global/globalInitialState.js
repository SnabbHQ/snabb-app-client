/**
 * # globalInitialState.js
 *
 * This class is a Immutable object
 * Working *successfully* with Redux, requires
 * state that is immutable.
 * In my opinion, that can not be by convention
 * By using Immutable, it's enforced.  Just saying....
 *
 */
'use strict'
/**
 * ## Import
 */
import {Record} from 'immutable'
import * as Defaults from '../location/locationConstants'

/**
 * ## InitialState
 *
 * * currentUser - object returned from server when validated
 * * showState - toggle for Header to display state
 * * currentState - object in Json format of the entire state
 * * store - the Redux store which is an object w/ 4 initial states
 *   * device
 *   * auth
 *   * global
 *   * profile
 *
 */
var InitialState = Record({
  pickupLocation: {
    latitude: Defaults.LATITUDE,
    longitude: Defaults.LONGITUDE,
    latitudeDelta: Defaults.LATITUDE_DELTA,
    longitudeDelta: Defaults.LONGITUDE_DELTA
  },
  currentUser: null,
  showState: false,
  currentState: null,
  store: null
})
export default InitialState
