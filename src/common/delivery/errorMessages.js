/* @flow */
import { defineMessages } from 'react-intl';

const errorMessages = defineMessages({
  ROUTE_REQUIRED: {
    defaultMessage: 'Invalid address. Please enter the street name and number',
    id: 'delivery.error.routeRequired',
  },
  INVALID_ZIPCODE: {
    defaultMessage: 'Sorry but Snabb does not operate in this zipcode. We are working hard to reach you!',
    id: 'delivery.error.invalidZipcode',
  }
});

export default errorMessages;
