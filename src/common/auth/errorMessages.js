/* @flow */
import { defineMessages } from 'react-intl';

const errorMessages = defineMessages({
  required: {
    defaultMessage: `Please fill out the {prop, select,
      companyName {company name}
      phone {phone}
      email {email}
      password {password}
      currentPassword {current password}
      newPassword {new password}
      newPasswordConfirmation {new password confirmation}
    }.`,
    id: 'auth.error.required',
  },
  email: {
    defaultMessage: 'Email address is not valid.',
    id: 'auth.error.email',
  },
  passwordsNotEqual: {
    defaultMessage: 'The passwords provided are not equal',
    id: 'user.error.passwordNotEqual'
  },
  phone: {
    defaultMessage: 'Phone number is not valid.',
    id: 'auth.error.phone',
  },
  phoneNotCorrect: {
    defaultMessage: 'The phone number must be in international format.',
    id: 'auth.error.phoneNotCorrect',
  },
  countryNotSupported: {
    defaultMessage: 'Sorry but we not yet available in that country. We are working hard towards that!',
    id: 'auth.error.phoneNotCorrect',
  },
  simplePassword: {
    defaultMessage: 'Password must contain at least {minLength} characters.',
    id: 'auth.error.simplePassword',
  },
  INVALID_GRANT: {
    defaultMessage: 'Incorrect username or password.',
    id: 'auth.error.invalidCredentials',
  },
});

export default errorMessages;
