/**
 * # configureStore.js
 *
 * A Redux boilerplate setup
 *
 */
'use strict'

import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk'

import rootReducer from '../reducers';
import rootEpic from '../reducers/user/profile/epics';


const epicMiddleware = createEpicMiddleware(rootEpic);

export default function configureStore() {
  const composeEnhancers = compose;
  return createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(
        thunk,
        epicMiddleware,
      )
    )
  );
}
