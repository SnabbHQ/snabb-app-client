/**
 * # configureStore.js
 *
 * A Redux boilerplate setup
 *
 */
'use strict'

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

/**
* ## Reducer
* The reducer contains the 5 reducers from
 *
* device, global, auth, profile, location
*/
import reducer from '../reducers'

/**
 * ## creatStoreWithMiddleware
 *
 * Like the name...
 */
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

/**
 * ## configureStore
 * @param initialState {Object} the state with for keys:
 * device, global, auth, profile, location
 *
 */
export default function configureStore (initialState) {
  return createStoreWithMiddleware(reducer, initialState)
};
