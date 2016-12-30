/* @flow */
import React from 'react';
import linksMessages from '../../../common/app/linksMessages';
import { Title, Card, Text, Box } from '../../app/components';
import CreditCardField from './CreditCardField';
import BillingDetails from './BillingDetails';

const Billing = () => (
  <Box>
    <Title message={linksMessages.billing} />
    <Card>
      <Text display="block">Wallet</Text>
      <Text display="block">0.0 Euros</Text>
      <Text>Add Coupon</Text>
    </Card>
    <Card>
      <Text>Credit Cards</Text>
      <CreditCardField />
      <Text>Add credit card</Text>
    </Card>
    <Card>
      <BillingDetails />
    </Card>
  </Box>
);

export default Billing;

