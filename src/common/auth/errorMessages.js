/* @flow */
import { defineMessages } from 'react-intl';

const errorMessages = defineMessages({
  required: {
    defaultMessage: `Please fill out the {prop, select,
      name {name}
      email {email}
      phone {phone}
      password {password}
    }.`,
    id: 'auth.error.required',
  },
  email: {
    defaultMessage: 'Email address is not valid.',
    id: 'auth.error.email',
  },
  phone: {
    defaultMessage: 'Phone number is not valid.',
    id: 'auth.error.email',
  },
  countryNotSupported: {
    defaultMessage: 'Sorry but the phone number used does not belong to a country we support yet.',
    id: 'auth.error.email',
  },
  simplePassword: {
    defaultMessage: 'Password must contain at least {minLength} characters.',
    id: 'auth.error.simplePassword',
  },
});

export default errorMessages;
