// @flow
import R from 'ramda';
import React from 'react';
import { appShowMessage } from '../../common/app/actions';
import authMessages from '../../common/auth/authMessages';
import buttonsMessages from '../../common/app/buttonsMessages';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Text, Box, Button, Space } from '../app/components';

type AppMessageProps = {
  appShowMessage: any,
};

const AppMessage = ({ appShowMessage }: AppMessageProps) => {
  const close = () => {
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
        <FormattedMessage {...authMessages.emailVerificationSent} />
      </Text>
      <Space auto />
      <Button
        white
        size={-1}
        bold
        color="primary"
        onClick={close}
        paddingHorizontal={2}
      >
        <FormattedMessage {...buttonsMessages.ok} />
      </Button>
    </Box>
  );
};

export default connect(
  null,
  { appShowMessage },
)(AppMessage);
