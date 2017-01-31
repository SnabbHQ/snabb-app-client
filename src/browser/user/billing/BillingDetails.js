/* @flow */
import React from 'react';
import linksMessages from '../../../common/app/linksMessages';
import { Title, Card, Box } from '../../app/components';
import PromoCodeField from './PromoCodeField';
import BillingDetailsFields from './BillingDetailsFields';
import CreditCardField from './CreditCardField';

const Billing = () => (
  <Box>
    <Title message={linksMessages.billing} />
    <BillingDetailsFields />
    <CreditCardField />
    <PromoCodeField />
  </Box>
);

export default Billing;

