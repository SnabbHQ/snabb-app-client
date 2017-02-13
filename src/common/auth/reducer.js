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
    case 'LOG_OUT': {
      return { ...state, formDisabled: true, isFetching: true, error: null };
    }

    case 'LOG_IN_SUCCESS':
    case 'LOG_OUT_SUCCESS': {
      return { ...state, formDisabled: false, isFetching: false, error: null };
    }

    case 'LOG_IN_FAIL':
    case 'LOG_OUT_FAIL': {
      return { ...state, formDisabled: false, isFetching: false, error: action.payload.error };
    }

    case 'FIELDS_SET_FIELD': {
      return { ...state, formDisabled: false, isFetching: false, error: null };
    }

    default:
      return state;
  }
};

export default reducer;
