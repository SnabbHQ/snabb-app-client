/* @flow */
import React from 'react';
import profileMessages from '../../../common/user/profile/profileMessages';
import buttonMessages from '../../../common/app/buttonsMessages';
import { FormattedMessage } from 'react-intl';
import { Text, Button, Space, FieldHeader, Input, Box } from '../../app/components';

const ChangePasswordField = () => (
  <Box>
    <FieldHeader title={profileMessages.changePassword} />
    <Text>Change your password</Text>
    <Box display="flex">
      <Box width="50%">
        <Input
          name="Current Password"
          label="Current Password"
          labelSize={-1}
          maxLength={100}
          placeholder={''}
          type="text"
        />
      </Box>
      <Box width="50%">
        <Input
          name="New Password"
          label="New Password"
          labelSize={-1}
          maxLength={100}
          placeholder={''}
          type="text"
        />
      </Box>
    </Box>
    <Box display="flex">
      <Space auto />
      <Button>
        <FormattedMessage {...buttonMessages.cancel} />
      </Button>
      <Button>
        <FormattedMessage {...buttonMessages.save} />
      </Button>
    </Box>
  </Box>
);

export default ChangePasswordField;

