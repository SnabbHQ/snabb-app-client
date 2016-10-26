/**
 * # reducers
 *
 * This class combines all the reducers into one
 *
 */
'use strict';

import auth from './user/auth/authReducer'
import device from './device/deviceReducer'
import location from './location/locationReducer'
import global from './global/globalReducer'
import profile from './user/profile/profileReducer'

import { combineReducers } from 'redux'

/**
 * ## CombineReducers
 *
 * the rootReducer will call each and every reducer with the state and action
 * EVERY TIME there is a basic action
 */
const rootReducer = combineReducers({
  auth,
  device,
  location,
  global,
  profile
});

export default rootReducer
