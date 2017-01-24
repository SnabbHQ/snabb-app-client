/* @flow */
import { defineMessages } from 'react-intl';

const userMessages = defineMessages({
  businessInfo: {
    defaultMessage: 'Business Information',
    id: 'user.profile.businessInfoTitle',
  },
  changePassword: {
    defaultMessage: 'Change Password',
    id: 'user.profile.changePassword',
  },
  generalInfo: {
    defaultMessage: 'General Information',
    id: 'user.profile.generalInfo',
  },
  userVerifying: {
    defaultMessage: 'Verifying the user',
    id: 'user.verified',
  },
  userVerifiedHeader: {
    defaultMessage: 'The user has been verified',
    id: 'user.verified',
  },
  userVerifiedMessage: {
    defaultMessage: 'Now you will be able to fully use our amazing service.',
    id: 'user.verified',
  },
});

export default userMessages;
