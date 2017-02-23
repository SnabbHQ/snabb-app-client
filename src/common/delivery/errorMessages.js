/* @flow */
import { defineMessages } from 'react-intl';

const errorMessages = defineMessages({
  ROUTE_REQUIRED: {
    defaultMessage: 'Invalid address. Please enter the street name and number',
    id: 'delivery.error.routeRequired',
  },
  INVALID_CITY: {
    defaultMessage: 'Sorry but Snabb does not operate in this city',
    id: 'delivery.error.invalidCity',
  },
  INVALID_COUNTRY: {
    defaultMessage: 'Sorry but Snabb does not operate in this country',
    id: 'delivery.error.invaidCountry',
  },
  INVALID_ZIPCODE: {
    defaultMessage: 'Sorry but Snabb does not operate in this zipcode',
    id: 'delivery.error.invalidZipcode',
  }
});

export default errorMessages;
