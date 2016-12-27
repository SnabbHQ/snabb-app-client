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
    case 'REGISTER': {
      return { ...state, formDisabled: true };
    }

    case 'LOG_IN_DONE':
    case 'REGISTER_DONE': {
      return { ...state, formDisabled: false, error: null };
    }

    case 'LOG_IN_FAIL':
    case 'REGISTER_FAIL': {
      return { ...state, formDisabled: false, error: action.payload.error };
    }

    default:
      return state;

  }
};

export default reducer;
