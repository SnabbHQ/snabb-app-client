/* @flow */
import R from 'ramda';
import React from 'react';
import buttonMessages from '../../../common/app/buttonsMessages';
import inputMessages from '../../../common/app/inputMessages';
import linksMessages from '../../../common/app/linksMessages';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FieldHeader, Button, Space, Input, Box } from '../../app/components';

const AccountInfoFields = ({ intl }) => (
  <Box>
    <FieldHeader title={linksMessages.account} />
    <Input
      name="Business Name"
      label={intl.formatMessage(inputMessages.name)}
      maxLength={100}
      placeholder={intl.formatMessage(inputMessages.name)}
      type="text"
    />
    <Input
      name="Email"
      label={intl.formatMessage(inputMessages.email)}
      maxLength={100}
      placeholder={intl.formatMessage(inputMessages.emailPlaceholder)}
      type="text"
    />
    <Input
      name="Phone"
      label={intl.formatMessage(inputMessages.phone)}
      maxLength={100}
      placeholder={intl.formatMessage(inputMessages.phonePlaceholder)}
      type="text"
    />
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

export default R.compose(
  injectIntl,
)(AccountInfoFields);

