/* @flow */
import type { State } from '../../../common/types';
import R from 'ramda';
import React from 'react';
import buttonMessages from '../../../common/app/buttonsMessages';
import inputMessages from '../../../common/app/inputMessages';
import linksMessages from '../../../common/app/linksMessages';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FieldHeader, Button, Space, Input, Box } from '../../app/components';

const PasswordFields = ({ profile, intl }) => (
  <Box>
    <FieldHeader titleSize={2} title={linksMessages.changePassword} />
    <Input
      name="Current Password"
      label={intl.formatMessage(inputMessages.currentPassword)}
      maxLength={100}
      type="password"
    />
    <Input
      name="New Password"
      label={intl.formatMessage(inputMessages.newPassword)}
      maxLength={100}
      type="password"
    />
    <Box display="flex" marginVertical={1}>
      <Space auto />
      <Button gray paddingHorizontal={2}>
        <FormattedMessage {...buttonMessages.cancel} />
      </Button>
      <Space x={1} />
      <Button accent paddingHorizontal={2}>
        <FormattedMessage {...buttonMessages.save} />
      </Button>
    </Box>
  </Box>
);

export default R.compose(
  connect(
    (state: State) => ({
      profile: state.user.profile,
    }),
    null,
  ),
  injectIntl,
)(PasswordFields);

