/* @flow */
import React from 'react';
import linksMessages from '../../../common/app/linksMessages';
import { Title, Box } from '../../app/components';
import BillingDetailsFields from './BillingDetailsFields';
import CreditCardField from './CreditCardField';

const Billing = () => (
  <Box>
    <Title message={linksMessages.billing} />
    <BillingDetailsFields />
    <CreditCardField />
  </Box>
);

export default Billing;

