/* @flow */
import { defineMessages } from 'react-intl';

const authMessages = defineMessages({
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
    id: 'auth.register.createAccount',
  },
  createAccountHeader: {
    defaultMessage: 'Tell us a bit more about you',
    id: 'auth.register.createAccountHeader',
  },
  businessName: {
    defaultMessage: 'Business Name',
    id: 'auth.register.businessName',
  },
  businessEmail: {
    defaultMessage: 'Business Email',
    id: 'auth.register.businessEmail',
  },
  phone: {
    defaultMessage: 'Business Phone',
    id: 'auth.register.businessPhone',
  },
  recoveryEmailSent: {
    defaultMessage: 'Recovery email has been sent.',
    id: 'auth.reset.recoveryEmailSent',
  },
  resetPassword: {
    defaultMessage: 'Reset Password',
    id: 'auth.reset.resetPassword',
  },
  resetPasswordDescription: {
    defaultMessage: 'Enter your email address and we will send you a link to reset your password.',
    id: 'auth.reset.resetPasswordDescription',
  },
});

export default authMessages;
