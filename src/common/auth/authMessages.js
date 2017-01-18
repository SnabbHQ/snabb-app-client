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
  emailVerificationSent: {
    defaultMessage: 'We sent you an email to confirm your account. Please check it before you request your first delivery',
    id: 'auth.email.verificationSent',
  },
  passwordForgotten: {
    defaultMessage: 'Forgot your password?',
    id: 'auth.email.passwordForgotten',
  },
  recoveryEmailSent: {
    defaultMessage: 'Recovery email has been sent.',
    id: 'auth.reset.recoveryEmailSent',
  },
  resetPassword: {
    defaultMessage: 'Forgot password',
    id: 'auth.reset.resetPassword',
  },
  resetPasswordDescription: {
    defaultMessage: 'You’ll receive an email with detailed instructions on how to set a new password.',
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
  termsAndPrivacy: {
    defaultMessage: 'By joining, you agree to Snabb\'s <a href="https://snabb.io/terms/">Terms & Conditions</a> and <a href="https://snabb.io/privacy">Privacy Policy</a>',
    id: 'auth.register.termsLabelPart1',
  },
});

export default authMessages;
