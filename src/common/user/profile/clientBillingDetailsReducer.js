import { combineReducers } from 'redux';
import createPendingStatusReducer from '../lib/createPendingStatusReducer';
import {
  BILLING_DETAILS_CHANGE,
  UPDATE_BILLING_DETAILS_REQUEST,
  UPDATE_BILLING_DETAILS_SUCCESS,
  UPDATE_BILLING_DETAILS_FAILURE
} from '../actions';

const billingDetailsIsSending = createPendingStatusReducer([
  UPDATE_BILLING_DETAILS_REQUEST,
  UPDATE_BILLING_DETAILS_SUCCESS,
  UPDATE_BILLING_DETAILS_FAILURE
]);

function billingDetailsValue(state = {}, action) {
  switch (action.type) {
    case UPDATE_BILLING_DETAILS_SUCCESS:
      return action.billingAccount;
    case BILLING_DETAILS_CHANGE:
      return action.billingAccount;
    default:
      return state;
  }
}

export default combineReducers({
  billingDetailsIsSending,
  billingDetailsValue
});
