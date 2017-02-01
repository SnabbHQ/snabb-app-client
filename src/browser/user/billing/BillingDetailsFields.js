// @flow
import React from 'react';
import buttonMessages from '../../../common/app/buttonsMessages';
import billingMessages from '../../../common/user/billingMessages';
import { FormattedMessage } from 'react-intl';
import { Button, Input, FieldHeader, Box, Space } from '../../app/components';

const BillingDetailsFields = () => (
  <Box>
    <FieldHeader title={billingMessages.billingDetailsTitle} />
    <Box display="flex"  justifyContent="space-between">
      <Input
        flex={1}
        name="Company Name"
        label="Company Name"
        maxLength={100}
        placeholder={'Your company'}
        type="text"
      />
      <Space x={0.33} />
      <Input
        flex={1}
        name="VAT number"
        label="VAT number"
        maxLength={100}
        placeholder={'VAT Number'}
        type="text"
      />
    </Box>
    <Box display="block">
      <Input
        name="Company Address"
        label="Address"
        maxLength={100}
        placeholder={'Street name'}
        type="text"
      />
    </Box>
    <Box display="flex" justifyContent="space-between">
      <Input
        flex={1}
        name="City"
        maxLength={100}
        placeholder={'City'}
        type="text"
      />
      <Space x={0.33} />
      <Input
        flex={1}
        name="Postal Code"
        maxLength={100}
        placeholder={'Postal Code'}
        type="text"
      />
      <Space x={0.33} />
      <Input
        flex={1}
        name="Country"
        maxLength={100}
        placeholder={'Country'}
        type="text"
      />
    </Box>
    <Box display="flex">
      <Space auto />
      <Button gray>
        <FormattedMessage {...buttonMessages.cancel} />
      </Button>
      <Space x={0.33} />
      <Button accent>
        <FormattedMessage {...buttonMessages.save} />
      </Button>
    </Box>
  </Box>
);

export default BillingDetailsFields;
