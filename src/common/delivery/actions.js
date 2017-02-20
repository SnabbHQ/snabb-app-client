/* @flow */
import type { Action } from '../types';

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

