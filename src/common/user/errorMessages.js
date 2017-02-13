/* @flow */
import { defineMessages } from 'react-intl';

const errorMessages = defineMessages({
  userAlreadyVerified: {
    defaultMessage: 'Sorry but the user was already verified.',
    id: 'user.error.alreadyVerified',
  },
  CURRENT_PASSWORD_WRONG: {
    defaultMessage: 'Your current password is not correct.',
    id: 'user.error.currentPasswordWrong',
  }
});

export default errorMessages;
