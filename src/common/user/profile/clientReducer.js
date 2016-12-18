import {
  CLIENT_SUCCESS,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_PASSWORD_SUCCESS,
  UPDATE_BILLING_DETAILS_SUCCESS,
  CLIENT_EXTRA_SUCCESS,
} from './actions';

export default function client(state = {
  isExtraLoaded: false,
}, action) {
  switch (action.type) {
    case CLIENT_SUCCESS:
    case UPDATE_CLIENT_SUCCESS:
    case UPDATE_CLIENT_PASSWORD_SUCCESS:
      return {
        ...state,
        ...action.client,
        company_name: action.client.companyName,
      };
    case UPDATE_BILLING_DETAILS_SUCCESS:
      return {
        ...state,
        billingAccount: action.billingAccount,
      };
    case CLIENT_EXTRA_SUCCESS:
      const {
        recentDropOffAddresses,
        recentPickUpAddresses,
      } = action.extra;

      return {
        ...state,
        isExtraLoaded: true,
        recentDropOffAddresses,
        recentPickUpAddresses,
      };
  }

  return state;
}
