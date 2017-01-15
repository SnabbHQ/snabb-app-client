/* @flow */
import { defineMessages } from 'react-intl';

const errorMessages = defineMessages({
  required: {
    defaultMessage: `Please fill out the {prop, select,
      name {name}
      phone {phone}
      email {email}
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
    id: 'auth.error.phone',
  },
  phoneNotCorrect: {
    defaultMessage: 'The phone number must be in international format.',
    id: 'auth.error.phoneNotCorrect',
  },
  simplePassword: {
    defaultMessage: 'Password must contain at least {minLength} characters.',
    id: 'auth.error.simplePassword',
  },
});

export default errorMessages;
