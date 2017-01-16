/* @flow */
import { defineMessages } from 'react-intl';

const authMessages = defineMessages({
  alreadyAccount: {
    defaultMessage: 'I already have an account',
    id: 'auth.register.alreadyAccount'
  },
  businessName: {
    defaultMessage: 'Business Name',
    id: 'auth.register.businessName',
  },
  createAccount: {
    defaultMessage: 'Create an Account',
    id: 'auth.register.createAccount',
  },
  createAccountHeader: {
    defaultMessage: 'Welcome to',
    id: 'auth.register.createAccountHeader',
  },
  email: {
    defaultMessage: 'Email',
    id: 'auth.email',
  },
  emailVerificationSent: {
    defaultMessage: 'We sent you an email to confirm your account. Please check it before you request your first delivery',
    id: 'auth.email.verificationSent',
  },
  password: {
    defaultMessage: 'Password',
    id: 'auth.password',
  },
  passwordForgotten: {
    defaultMessage: 'Forgot Your Password?',
    id: 'auth.email.passwordForgotten',
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
  termsAndPrivacy: {
    defaultMessage: 'By joining, you agree to Snabb\'s <a href="https://snabb.io/terms/">Terms & Conditions</a> and <a href="https://snabb.io/privacy">Privacy Policy</a>',
    id: 'auth.register.termsLabelPart1',
  },
});

export default authMessages;
