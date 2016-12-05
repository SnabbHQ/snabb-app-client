import { combineReducers } from 'redux';
import createPendingStatusReducer from '../lib/createPendingStatusReducer';
import {
  CLIENT_GENERAL_VALUE_CHANGE,
  UPDATE_CLIENT_REQUEST,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_FAILURE,
  CLIENT_PASSWORD_VALUE_CHANGE,
  UPDATE_CLIENT_PASSWORD_REQUEST,
  UPDATE_CLIENT_PASSWORD_SUCCESS,
  UPDATE_CLIENT_PASSWORD_FAILURE
} from '../actions';

function generalValue(state = {}, action) {
  switch (action.type) {
    case UPDATE_CLIENT_SUCCESS:
      return {
        ...action.client,
        company_name: action.client.companyName
      };
    case CLIENT_GENERAL_VALUE_CHANGE:
      return {
        ...action.value,
        company_name: action.value.company_name || action.value.companyName
      };
    default:
      return state;
  }
}

const generalIsSaving = createPendingStatusReducer([
  UPDATE_CLIENT_REQUEST,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_FAILURE
]);

function passwordValue(state = {}, action) {
  switch (action.type) {
    case UPDATE_CLIENT_PASSWORD_SUCCESS:
      return {};
    case CLIENT_PASSWORD_VALUE_CHANGE:
      return action.value;
    default:
      return state;
  }
}

const passwordIsSaving = createPendingStatusReducer([
  UPDATE_CLIENT_PASSWORD_REQUEST,
  UPDATE_CLIENT_PASSWORD_SUCCESS,
  UPDATE_CLIENT_PASSWORD_FAILURE
]);

export default combineReducers({
  generalValue,
  generalIsSaving,
  passwordValue,
  passwordIsSaving
});
