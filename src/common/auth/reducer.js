import type { Action, AuthState } from '../types';

const initialState = {
  formDisabled: false,
  error: null,
  isValid: false,
  isFetching: false,
  forgotPasswordSent: false,
};


const reducer = (
  state: AuthState = initialState,
  action: Action,
): AuthState => {
  switch (action.type) {
    case 'LOG_IN':
    case 'REGISTER':
    case 'LOG_OUT':
    case 'FORGOT_PASSWORD': {
      return { ...state, formDisabled: true, isFetching: true, error: null };
    }

    case 'LOG_IN_SUCCESS':
    case 'REGISTER_SUCCESS':
    case 'LOG_OUT_SUCCESS': {
      return { ...state, formDisabled: false, isFetching: false, error: null };
    }

    case 'FORGOT_PASSWORD_SUCCESS': {
      return {
        ...state,
        forgotPasswordSent: true,
        formDisabled: false,
        isFetching: false,
        error: null,
      };
    }

    case 'LOG_IN_FAIL':
    case 'REGISTER_FAIL':
    case 'LOG_OUT_FAIL':
    case 'FORGOT_PASSWORD_FAIL': {
      return {
        ...state,
        forgotPasswordSent: false,
        formDisabled: false,
        isFetching: false,
        error: action.payload.error,
      };
    }

    case 'FIELDS_SET_FIELD': {
      return { ...state, formDisabled: false, isFetching: false, error: null };
    }

    case 'RESET_AUTH_STATE':
      return initialState;

    default:
      return state;
  }
};

export default reducer;
