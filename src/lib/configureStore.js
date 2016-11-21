/**
 * # configureStore.js
 *
 * A Redux boilerplate setup
 *
 */
'use strict'

import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk'

import rootReducer from '../reducers'
import profileRootEpics from '../reducers/user/profile/epics'


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
  return createStoreWithMiddleware(rootReducer, initialState)
};


// const epicMiddleware = createEpicMiddleware(profileRootEpics);
//
//
// /**
//  * ## configureStore
//  * @param initialState {Object} the state with for keys:
//  * device, global, auth, profile, location
//  *
//  */
// export default function configureStore(initialState) {
//   return createStore(
//     rootReducer,
//     applyMiddleware(
//       epicMiddleware,
//       thunk
//     )
//   )
// }
