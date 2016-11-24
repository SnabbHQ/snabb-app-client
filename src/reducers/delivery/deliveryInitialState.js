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
import * as ActionTypes from './DeliveryStepActionTypes';

/**
 * ## InitialState
 *
 * The fields we're concerned with
 */
var InitialState = Record({
  step: ActionTypes.SET_PICKUP
});

export default InitialState
