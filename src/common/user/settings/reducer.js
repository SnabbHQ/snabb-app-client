import { combineReducers } from 'redux';
import createPendingStatusReducer from '../../lib/createPendingStatusReducer';
import {
  CLIENT_SETTINGS_REQUEST,
  CLIENT_SETTINGS_SUCCESS,
  CLIENT_SETTINGS_FAILURE,
} from './actions';

const isLoading = createPendingStatusReducer([
  CLIENT_SETTINGS_REQUEST,
  CLIENT_SETTINGS_SUCCESS,
  CLIENT_SETTINGS_FAILURE,
]);

function settings(state = null, action) {
  if (action.type === CLIENT_SETTINGS_SUCCESS) {
    return action.settings;
  } else {
    return state;
  }
}

export default combineReducers({ isLoading, settings });
