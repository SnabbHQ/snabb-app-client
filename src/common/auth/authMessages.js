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
    defaultMessage: 'Tell us a about your business',
    id: 'auth.register.createAccountHeader',
  },
  termsLabelPart1: {
    defaultMessage: 'By clicking on "Create an account", you are agreeing to the ',
    id: 'auth.register.termsLabelPart1',
  },
  termsLabelPart2: {
    defaultMessage: ' and the ',
    id: 'auth.register.termsLabelPart2',
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
  resetPasswordSent: {
    defaultMessage: 'Password Sent!',
    id: 'auth.reset.resetPasswordSent',
  },
  resetPasswordSentDesc: {
    defaultMessage: 'Check your email for a link to reset your password. If it doesn\'t appear ' +
    'within a few minutes, check your spam folder.',
    id: 'auth.reset.resetPasswordsSentDesc',
  },
});

export default authMessages;
