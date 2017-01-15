/* @flow */
import { defineMessages } from 'react-intl';

const authMessages = defineMessages({
  email: {
    defaultMessage: 'Email',
    id: 'auth.email',
  },
  password: {
    defaultMessage: 'Password',
    id: 'auth.password',
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
    defaultMessage: 'Welcome to',
    id: 'auth.register.createAccountHeader',
  },
  termsAndPrivacy: {
    defaultMessage: 'By joining, you agree to the Snabb\'s {termsLink} and {privacyLink}',
    id: 'auth.register.termsLabelPart1',
  },
  businessName: {
    defaultMessage: 'Business Name',
    id: 'auth.register.businessName',
  },
  phone: {
    defaultMessage: 'Phone Number (e.g. +34 661 518 132)',
    id: 'auth.register.phone',
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
