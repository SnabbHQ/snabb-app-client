// @flow
import React from 'react';
import buttonMessages from '../../../common/app/buttonsMessages';
import billingMessages from '../../../common/user/billing/billingMessages';
import { FormattedMessage } from 'react-intl';
import { Button, Input, FieldHeader, Box, Space } from '../../app/components';

const BillingDetails = () => (
  <Box>
    <FieldHeader title={billingMessages.billingDetailsTitle} />
    <Box display="flex">
      <Input
        name="Company Name"
        label="Company Name"
        maxLength={100}
        placeholder={''}
        type="text"
      />
      <Input
        name="Company Address"
        label="Company Address"
        maxLength={100}
        placeholder={''}
        type="text"
      />
    </Box>
    <Box display="flex">
      <Input
        name="City"
        label="City"
        maxLength={100}
        placeholder={''}
        type="text"
      />
      <Input
        name="Postal Code"
        label="Postal Code"
        maxLength={100}
        placeholder={''}
        type="text"
      />
      <Input
        name="Country"
        label="Country"
        maxLength={100}
        placeholder={''}
        type="text"
      />
      <Input
        name="VAT number"
        label="VAT number"
        maxLength={100}
        placeholder={''}
        type="text"
      />
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

export default BillingDetails;
