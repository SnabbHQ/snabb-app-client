/* @flow */
import { defineMessages } from 'react-intl';

const errorMessages = defineMessages({
  ALREADY_VERIFIED: {
    defaultMessage: 'The user was already verified.',
    id: 'user.error.alreadyVerified',
  },
  CURRENT_PASSWORD_WRONG: {
    defaultMessage: 'Your current password is not correct.',
    id: 'user.error.currentPasswordWrong',
  },
  EMAIL_ALREADY_EXISTS: {
    defaultMessage: 'The email used already exists.',
    id: 'user.error.emailAlreadyExists',
  },
  EMAIL_AND_PASSWORD_REQUIRED: {
    defaultMessage: 'Company Name, Email, phone and password required.',
    id: 'user.error.emailAndPasswordRequired',
  },
  EMAIL_NOT_EXISTS: {
    defaultMessage: 'The email introduced does not exists.',
    id: 'user.error.emailNotExists',
  },
  HASH_NOT_EXISTS: {
    defaultMessage: 'Most likely your user has already been verified!',
    id: 'user.error.emailAndPasswordRequired',
  },
});

export default errorMessages;
