// @flow
import React from 'react';
import { Space } from '../../app/components-old';
import buttonMessages from '../../../common/app/buttonsMessages';
import billingMessages from '../../../common/user/billing/billingMessages';
import { FormattedMessage } from 'react-intl';
import { Button, Input, FieldHeader, Box } from '../../app/components';

const BillingDetails = () => (
  <Box>
    <FieldHeader title={billingMessages.billingDetailsTitle} />
    <Box display="flex">
      <Input
        name="Company Name"
        label="Company Name"
        labelSize={-1}
        maxLength={100}
        placeholder={''}
        type="text"
      />
      <Input
        name="Company Address"
        label="Company Address"
        labelSize={-1}
        maxLength={100}
        placeholder={''}
        type="text"
      />
    </Box>
    <Box display="flex">
      <Input
        name="City"
        label="City"
        labelSize={-1}
        maxLength={100}
        placeholder={''}
        type="text"
      />
      <Input
        name="Postal Code"
        label="Postal Code"
        labelSize={-1}
        maxLength={100}
        placeholder={''}
        type="text"
      />
      <Input
        name="Country"
        label="Country"
        labelSize={-1}
        maxLength={100}
        placeholder={''}
        type="text"
      />
      <Input
        name="VAT number"
        label="VAT number"
        labelSize={-1}
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
