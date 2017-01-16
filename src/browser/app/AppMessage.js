// @flow
import React from 'react';
import authMessages from '../../common/auth/authMessages';
import buttonsMessages from '../../common/app/buttonsMessages';
import { FormattedMessage } from 'react-intl';
import { Text, Box, Button, Space } from '../app/components';

const AppMessage = () => (
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
      paddingHorizontal={2}
    >
      <FormattedMessage {...buttonsMessages.ok} />
    </Button>
  </Box>
);

export default AppMessage;
