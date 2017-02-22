/* @flow */
import type { Action, Quote } from '../types';

export const createQuote = (options?: string): Action => ({
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

export const validateAddress = (options?: string): Action => ({
  type: 'VALIDATE_ADDRESS',
  payload: { options },
});

export const validateAddressSuccess = (): Action => ({
  type: 'VALIDATE_ADDRESS_SUCCESS',
});

export const validateAddressFail = (error: Error): Action => ({
  type: 'VALIDATE_ADDRESS_FAIL',
  payload: { error },
});

