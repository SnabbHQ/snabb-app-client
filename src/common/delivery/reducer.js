import type { Action, DeliveryState } from '../types';

const initialState = {
  pickUpError: null,
  dropOffError: null,
  pickUpPlace: null,
  dropOffPlace: null,
  quote: null,
  error: null,
};

const reducer = (
  state: DeliveryState = initialState,
  action: Action,
): DeliveryState => {
  switch (action.type) {

    case 'CREATE_QUOTE':
    case 'VALIDATE_ADDRESS': {
      return { ...state, pickUpError: null, dropOffError: null, error: null };
    }

    case 'VALIDATE_ADDRESS_SUCCESS': {
      if (action.payload.place.placeType === 'pickUp') {
        return { ...state, pickUpPlace: action.payload.place, pickUpError: null, dropOffError: null, error: null };
      } else {
        return { ...state, dropOffPlace: action.payload.place, pickUpError: null, dropOffError: null, error: null };
      }
    }

    case 'CREATE_QUOTE_SUCCESS': {
      return {
        ...state, pickUpError: null, dropOffError: null, error: null, quote: action.payload.quote };
    }

    case 'CREATE_QUOTE_FAIL': {
      return {
        ...state, error: action.payload.error };
    }

    case 'VALIDATE_ADDRESS_FAIL': {
      if (action.payload.placeType === 'pickUp') {
        return {...state, pickUpError: action.payload.error };
      } else {
        return {...state, dropOffError: action.payload.error };
      }
    }

    default:
      return state;

  }
};

export default reducer;

