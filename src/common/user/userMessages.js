/* @flow */
import { defineMessages } from 'react-intl';

const userMessages = defineMessages({
  alreadyAccount: {
    defaultMessage: 'I already have an account',
    id: 'auth.register.alreadyAccount'
  },
  businessInfo: {
    defaultMessage: 'Business Information',
    id: 'user.profile.businessInfoTitle',
  },
  changePassword: {
    defaultMessage: 'Change Password',
    id: 'user.profile.changePassword',
  },
  createAccount: {
    defaultMessage: 'I don\'t have an account',
    id: 'auth.register.createAccount',
  },
  createAccountHeader: {
    defaultMessage: 'Welcome to',
    id: 'auth.register.createAccountHeader',
  },
  forgotPassword: {
    defaultMessage: 'Forgot your password?',
    id: 'auth.reset.forgotPassword',
  },
  forgotPasswordDescription: {
    defaultMessage: 'You’ll receive an email with detailed instructions on how to set a new updatePassword.',
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
  generalInfo: {
    defaultMessage: 'General Information',
    id: 'user.profile.generalInfo',
  },
  resetPasswordSuccessful: {
    defaultMessage: 'Password successfully updated!',
    id: 'auth.reset.resetPasswordSuccessful',
  },
  recoveryEmailSent: {
    defaultMessage: 'Recovery email has been sent.',
    id: 'auth.reset.recoveryEmailSent',
  },
  resetPasswordSuccessfulDesc: {
    defaultMessage: 'Your password has ben successfully been updated. Login with your new credentials.',
    id: 'auth.reset.resetPasswordSuccessfulDesc',
  },
  termsAndPrivacy: {
    defaultMessage: 'By joining, you agree to Snabb\'s <a href="https://snabb.io/terms/">Terms & Conditions</a> and <a href="https://snabb.io/privacy">Privacy Policy</a>',
    id: 'auth.register.termsLabelPart1',
  },
  userVerifiedHeader: {
    defaultMessage: 'The user has been verified',
    id: 'user.verified',
  },
  userVerifiedMessage: {
    defaultMessage: 'Now you will be able to fully use our amazing service.',
    id: 'user.verified',
  },
  userVerifying: {
    defaultMessage: 'Verifying the user',
    id: 'user.verified',
  },
});

export default userMessages;
