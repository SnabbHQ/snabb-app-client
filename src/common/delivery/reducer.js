import type { Action, DeliveriesState } from '../types';

const initialState = {
  error: null
};

const reducer = (
  state: DeliveriesState = initialState,
  action: Action,
): DeliveriesState => {
  switch (action.type) {

    case 'CREATE_QUOTE':
    case 'VALIDATE_ADDRESS':
    case 'VALIDATE_ADDRESS_SUCCESS': {
      return { ...state, error: null };
    }

    case 'CREATE_QUOTE_SUCCESS': {
      return {
        ...state, error: null, quote: action.payload.quote };
    }

    case 'CREATE_QUOTE_FAIL': {
      return {
        ...state, error: action.payload.error };
    }

    case 'VALIDATE_ADDRESS_FAIL': {
      return {
        ...state, error: action.payload.error };
    }

    default:
      return state;

  }
};

export default reducer;

