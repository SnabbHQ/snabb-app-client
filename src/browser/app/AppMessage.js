// @flow
import React from 'react';
import { appShowMessage } from '../../common/app/actions';
import { connect } from 'react-redux';
import { FormattedMessage, FormattedHTMLMessage, defineMessages } from 'react-intl';
import { Text, Box, Button, Link, Space } from '../app/components';

type AppMessageProps = {
  appShowMessage: any,
};

const appMessages = (email) => defineMessages({
  emailVerificationSentPart1: {
    defaultMessage: 'Your email address <b style="color: black">{email}</b> has not been confirmed. Please check it' +
    ' before you request your first delivery.',
    id: 'auth.email.verificationSent1',
    values: {
      email: email
    }
  },
  sendConfirmationEmail1: {
    defaultMessage: 'Resend email',
    id: 'app.email.sendConfirmationEmail',
  },
  updateEmailAddress1: {
    defaultMessage: 'Change email',
    id: 'app.email.updateEmailAddress',
  },
});


const AppMessage = ({ profile, appShowMessage }: AppMessageProps) => {
  const close = (e) => {
    e.preventDefault();

    appShowMessage(false);
  };

  return (
    <Box
      display="flex"
      backgroundColor="secondary"
      paddingHorizontal={1}
      paddingVertical={0.3}
    >
      <Text color="white">
        <FormattedHTMLMessage {...appMessages(profile.email).emailVerificationSentPart1} />
      </Text>
      <Space x={1}/>
      <Button
        transform="none"
        white
        size={-1}
        maxHeight={1}
        color="accent"
        onClick={close}
        paddingHorizontal={1}
      >
        <FormattedMessage {...appMessages().sendConfirmationEmail1} />
      </Button>
      <Space x={0.5}/>
      <Button
        transform="none"
        white
        size={-1}
        maxHeight={1}
        color="accent"
        onClick={close}
        paddingHorizontal={1}
      >
        <FormattedMessage {...appMessages().updateEmailAddress1} />
      </Button>
    </Box>
  );
};

export default connect(
  (state: State) => ({
    profile: state.user.profile,
  }),
  { appShowMessage },
)(AppMessage);
