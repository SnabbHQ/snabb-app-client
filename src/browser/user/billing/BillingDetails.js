/* @flow */
import React from 'react';
import linksMessages from '../../../common/app/linksMessages';
import { Title, Card, Box } from '../../app/components';
import PromoCodeField from './PromoCodeField';
import BillingDetails from './BillingDetailsField';
import CreditCardField from './CreditCardField';

const Billing = () => (
  <Box>
    <Title message={linksMessages.billing} />
    <BillingDetails />
    <CreditCardField />
    <PromoCodeField />
  </Box>
);

export default Billing;

