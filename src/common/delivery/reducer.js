import type { Action, DeliveryState } from '../types';

const initialState = {
  pickupError: null,
  dropoffError: null,
  pickupPlace: null,
  dropoffPlace: null,
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
      return { ...state, pickupError: null, dropoffError: null, error: null };
    }

    case 'VALIDATE_ADDRESS_SUCCESS': {
      if (action.payload.place.placeType === 'pickup') {
        return { ...state, pickupPlace: action.payload.place, pickupError: null, dropoffError: null, error: null };
      } else {
        return { ...state, dropoffPlace: action.payload.place, pickupError: null, dropoffError: null, error: null };
      }
    }

    case 'CREATE_QUOTE_SUCCESS': {
      return {
        ...state, pickupError: null, dropoffError: null, error: null, quote: action.payload.quote };
    }

    case 'CREATE_QUOTE_FAIL': {
      return {
        ...state, error: action.payload.error };
    }

    case 'VALIDATE_ADDRESS_FAIL': {
      if (action.payload.placeType === 'pickup') {
        return {...state, pickupError: action.payload.error };
      } else {
        return {...state, dropoffError: action.payload.error };
      }
    }

    case 'CLEAR_DELIVERY_STATE': {
      return initialState;
    }

    default:
      return state;

  }
};

export default reducer;

