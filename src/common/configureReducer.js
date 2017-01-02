/* @flow weak */
import type { Action, State } from './types';
import app from './app/reducer';
import config from './config/reducer';
import device from './device/deviceReducer';
import { closestCity, closestDrivers, jobs, newJob } from './job/reducers';
import auth from './auth/reducer';
import user from './user/reducer';
import location from './location/locationReducer';
import delivery from './delivery/deliveryReducer';
import global from './global/globalReducer';
import intl from './intl/reducer';
import themes from './themes/reducer';
import { combineReducers } from 'redux';
import { fieldsReducer as fields } from './lib/redux-fields';

// stackoverflow.com/q/35622588/233902
const resetStateOnSignOutReducer = (reducer, initialState) => (
  state: State,
  action: Action,
) => {
  const userWasSignedOut =
    action.type === 'ON_AUTH' &&
    state.user.profile &&
    !action.payload.user;
  if (!userWasSignedOut) {
    return reducer(state, action);
  }

  // Purge sensitive data, preserve only app and safe initial state.
  return reducer({
    app: state.app,
    global: initialState.global,
    location: initialState.location,
    config: initialState.config,
    device: initialState.device,
    job: initialState.job,
    jobs: initialState.jobs,
    newJob: initialState.newJob,
    intl: initialState.intl,
  }, action);
};

const configureReducer = (initialState: Object) => {
  let reducer = combineReducers({
    app,
    global,
    auth,
    user,
    location,
    delivery,
    config,
    device,
    jobs,
    fields,
    intl,
    themes,
  });

  // The power of higher-order reducers, http://slides.com/omnidan/hor
  reducer = resetStateOnSignOutReducer(reducer, initialState);

  return reducer;
};

export default configureReducer;
