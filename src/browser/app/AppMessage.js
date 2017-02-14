// @flow
import type { State, Profile } from '../../common/types';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, FormattedHTMLMessage, defineMessages } from 'react-intl';
import { sendVerifyEmail } from '../../common/user/actions'
import { Text, Box, Button, Space } from '../app/components';

const appMessages = (email) => defineMessages({
  emailVerificationSentPart1: {
    defaultMessage: 'Your email address <b style="color: black">{email}</b> has not been confirmed. Please check it' +
    ' before you request your first delivery.',
    id: 'auth.email.verificationSent1',
    values: {
      email: email
    }
  },
  sendConfirmationEmail: {
    defaultMessage: 'Resend',
    id: 'app.email.sendConfirmationEmail',
  },
  updateEmail: {
    defaultMessage: 'Change email',
    id: 'app.email.updateEmailAddress',
  },
});

type AppMessageProps = {
  profile: Profile
}


const AppMessage = ({ profile, sendVerifyEmail }: AppMessageProps, { router }: Object) => {

  const resendPasswordClick = () => {
    sendVerifyEmail(profile.email);
  };

  const goToSettings = () => {
    router.transitionTo('/settings/details');
  };

  return (
    <Box
      backgroundColor="secondary"
      paddingHorizontal={1}
      paddingVertical={0.3}
    >
      <Text bold color="white" size={-1}>
        <FormattedHTMLMessage {...appMessages(profile.email).emailVerificationSentPart1} />
      </Text>
      <Space x={1}/>
      <Button
        transform="none"
        white
        size={-1}
        maxHeight={1}
        color="black"
        onClick={resendPasswordClick}
        paddingHorizontal={1}
      >
        <FormattedMessage {...appMessages().sendConfirmationEmail} />
      </Button>
      <Space x={0.5}/>
      <Button
        transform="none"
        white
        size={-1}
        color="black"
        onClick={goToSettings}
        paddingHorizontal={1}
      >
        <FormattedMessage {...appMessages().updateEmail} />
      </Button>
    </Box>
  );
};

AppMessage.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default connect(
  (state: State) => ({
    profile: state.user.profile,
  }),
  { sendVerifyEmail },
)(AppMessage);
