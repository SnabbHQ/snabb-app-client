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

const LATITUDE = 39.4699; // Valencia as default
const LONGITUDE = 0.3763;

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
    latitude: LATITUDE,
    longitude: LONGITUDE
  },
  currentUser: null,
  showState: false,
  currentState: null,
  store: null
})
export default InitialState
