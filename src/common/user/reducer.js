/**
 * # profileReducer.js
 *
 * The reducer user profile actions
 */
import type { Action, UserState } from '../types';

const initialState = {
  error: null,
  forgotPasswordSent: false,
  formDisabled: false,
  isFetching: false,
  // Undefined is absence of evidence, null is evidence of absence.
  profile: undefined,
  resetPasswordSuccess: false,
  verified: false,
};

const reducer = (
  state: UserState = initialState,
  action: Action,
): UserState => {
  switch (action.type) {

    case 'LOG_IN_SUCCESS':
    case 'APP_STARTED': {
      return { ...state, profile: action.payload.profile };
    }

    case 'LOG_OUT_SUCCESS': {
      return { ...state, profile: null };
    }

    case 'REGISTER':
    case 'GET_PROFILE':
    case 'PASSWORD_UPDATE':
    case 'PASSWORD_RESET':
    case 'PROFILE_UPDATE':
    case 'FORGOT_PASSWORD':
    case 'VERIFY_USER': {
      return { ...state, formDisabled: true, isFetching: true, error: null, verified: false };
    }

    case 'REGISTER_SUCCESS':
    case 'GET_PROFILE_SUCCESS':
    case 'PROFILE_UPDATE_SUCCESS': {
      return { ...state, profile: action.payload.profile, formDisabled: false, isFetching: false, error: null };
    }

    case 'PASSWORD_RESET_SUCCESS': {
      return { ...state, resetPasswordSuccess: true, formDisabled: false, isFetching: false, error: null };
    }

    case 'FORGOT_PASSWORD_SUCCESS': {
      return { ...state, forgotPasswordSent: true, formDisabled: false, isFetching: false, error: null,
      };
    }

    case 'PASSWORD_UPDATE_SUCCESS': {
      return { ...state, formDisabled: false, isFetching: false, error: null };
    }

    case 'VERIFY_USER_SUCCESS': {
      return { ...state, verified: true, isFetching: false, error: null };
    }

    case 'REGISTER_FAIL':
    case 'GET_PROFILE_FAIL':
    case 'PASSWORD_UPDATE_FAIL':
    case 'PROFILE_UPDATE_FAIL':
    case 'VERIFY_USER_FAIL': {
      return {
        ...state, formDisabled: false, isFetching: false, error: action.payload.error, verified: false };
    }

    case 'FORGOT_PASSWORD_FAIL':
      return { ...state, forgotPasswordSent: false, formDisabled: false, isFetching: false, error: action.payload.error,
    };

    case 'PASSWORD_RESET_FAIL': {
      return {
        ...state, resetPasswordSuccess: false, formDisabled: false, isFetching: false, error: action.payload.error, verified: false };
    }

    case 'FIELDS_SET_FIELD': {
      return { ...state, formDisabled: false, isFetching: false, error: null };
    }

    default:
      return state;

  }
};

export default reducer;

