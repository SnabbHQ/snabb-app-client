import type { Action, AuthState } from '../types';

const initialState = {
  formDisabled: false,
  error: null,
  isValid: false,
  isFetching: false,
};


const reducer = (
  state: AuthState = initialState,
  action: Action,
): AuthState => {
  switch (action.type) {
    case 'LOG_IN':
    case 'REGISTER':
    case 'LOG_OUT':
    case 'RESET_PASSWORD': {
      return { ...state, formDisabled: true, isFetching: true, error: null };
    }

    case 'LOG_IN_SUCCESS':
    case 'REGISTER_SUCCESS':
    case 'LOG_OUT_SUCCESS':
    case 'RESET_PASSWORD_SUCCESS': {
      return { ...state, formDisabled: false, isFetching: false, error: null };
    }

    case 'LOG_IN_FAIL':
    case 'REGISTER_FAIL':
    case 'LOG_OUT_FAIL':
    case 'RESET_PASSWORD_FAIL': {
      return { ...state, formDisabled: false, isFetching: false, error: action.payload.error };
    }

    default:
      return state;
  }
};

export default reducer;
