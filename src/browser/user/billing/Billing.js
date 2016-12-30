/* @flow */
import React from 'react';
import linksMessages from '../../../common/app/linksMessages';
import { Title, Card, Text, Box } from '../../app/components';
import BillingDetails from './BillingDetails';
import CreditCardField from './CreditCardField';

const Billing = () => (
  <Box>
    <Title message={linksMessages.billing} />
    <Card>
      <Text display="block">Wallet</Text>
      <Text display="block">0.0 Euros</Text>
      <Text>Add Coupon</Text>
    </Card>
    <Card>
      <CreditCardField />
    </Card>
    <Card>
      <BillingDetails />
    </Card>
  </Box>
);

export default Billing;

