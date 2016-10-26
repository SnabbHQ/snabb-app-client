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

/**
 * ## InitialState
 *
 * The fields we're concerned with
 */
var InitialState = Record({
  pickup_location: {},
  delivery_location: {}
});

export default InitialState
