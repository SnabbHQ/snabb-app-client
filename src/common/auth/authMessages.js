/* @flow */
import { defineMessages } from 'react-intl';

const authMessages = defineMessages({
  alreadyAccount: {
    defaultMessage: 'I already have an account',
    id: 'auth.register.alreadyAccount'
  },
  createAccount: {
    defaultMessage: 'I don\'t have an account',
    id: 'auth.register.createAccount',
  },
  createAccountHeader: {
    defaultMessage: 'Welcome to',
    id: 'auth.register.createAccountHeader',
  },
  passwordForgotten: {
    defaultMessage: 'Forgot your password?',
    id: 'auth.email.passwordForgotten',
  },
  recoveryEmailSent: {
    defaultMessage: 'Recovery email has been sent.',
    id: 'auth.reset.recoveryEmailSent',
  },
  forgotPassword: {
    defaultMessage: 'Forgot password',
    id: 'auth.reset.forgotPassword',
  },
  forgotPasswordDescription: {
    defaultMessage: 'You’ll receive an email with detailed instructions on how to set a new password.',
    id: 'auth.reset.forgotPasswordDescription',
  },
  forgotPasswordSent: {
    defaultMessage: 'Password Sent!',
    id: 'auth.reset.forgotPasswordSent',
  },
  forgotPasswordSentDesc: {
    defaultMessage: 'Your instructions have been sent. Please check your email.',
    id: 'auth.reset.forgotPasswordsSentDesc',
  },
  termsAndPrivacy: {
    defaultMessage: 'By joining, you agree to Snabb\'s <a href="https://snabb.io/terms/">Terms & Conditions</a> and <a href="https://snabb.io/privacy">Privacy Policy</a>',
    id: 'auth.register.termsLabelPart1',
  },
});

export default authMessages;
