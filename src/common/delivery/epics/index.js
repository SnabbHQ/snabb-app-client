import createQuote from './createQuote';
import newDelivery from './newDelivery';
import validateAddress from './validateAddress';

export const epics = [
  createQuote,
  newDelivery,
  validateAddress,
];
