/* @flow */
import type { Action, Delivery, Quote } from '../types';

export const clearDeliveryState = (): Action => ({
  type: 'CLEAR_DELIVERY_STATE',
});

export const createQuote = (options?: Object): Action => ({
  type: 'CREATE_QUOTE',
  payload: { options },
});

export const createQuoteSuccess = (quote: Quote): Action => ({
  type: 'CREATE_QUOTE_SUCCESS',
  payload: { quote }
});

export const createQuoteFail = (error: Error): Action => ({
  type: 'CREATE_QUOTE_FAIL',
  payload: { error },
});

export const newDelivery = (options?: Object): Action => ({
  type: 'NEW_DELIVERY',
  payload: { options },
});

export const newDeliverySuccess = (delivery: Delivery): Action => ({
  type: 'NEW_DELIVERY_SUCCESS',
  payload: { delivery }
});

export const newDeliveryFail = (error: Error): Action => ({
  type: 'NEW_DELIVERY_FAIL',
  payload: { error },
});

export const validateAddress = (options?: Object): Action => ({
  type: 'VALIDATE_ADDRESS',
  payload: { options },
});

export const validateAddressSuccess = (place: Object): Action => ({
  type: 'VALIDATE_ADDRESS_SUCCESS',
  payload: { place }
});

export const validateAddressFail = (placeType: string, error: Error): Action => ({
  type: 'VALIDATE_ADDRESS_FAIL',
  payload: { placeType, error },
});

