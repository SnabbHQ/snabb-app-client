/* @flow */
import { defineMessages } from 'react-intl';

const emailMessages = defineMessages({
  emailLabel: {
    defaultMessage: 'Email',
    id: 'auth.email.emailLabel',
  },
  emailPlaceholder: {
    defaultMessage: 'your@email.com',
    id: 'auth.email.emailPlaceholder',
  },
  passwordLabel: {
    defaultMessage: 'Password',
    id: 'auth.email.passwordLabel',
  },
  passwordPlaceholder: {
    defaultMessage: 'password',
    id: 'auth.email.passwordPlaceholder',
  },
  passwordForgotten: {
    defaultMessage: 'Forgot Your Password?',
    id: 'auth.email.passwordForgotten',
  },
  createAccount: {
    defaultMessage: 'Create an Account',
    id: 'auth.email.createAccount',
  },
  recoveryEmailSent: {
    defaultMessage: 'Recovery email has been sent.',
    id: 'auth.email.recoveryEmailSent',
  },
  resetPassword: {
    defaultMessage: 'Reset Password',
    id: 'auth.email.resetPassword',
  },
});

export default emailMessages;
