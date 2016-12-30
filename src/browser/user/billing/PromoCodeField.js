import React from 'react';
import { Text, FieldHeader, Button, Box } from '../../app/components';
import { defineMessages, FormattedMessage } from 'react-intl';

const promoCodeMessages = defineMessages({
  promoTitle: {
    defaultMessage: 'Promo Codes',
    id: 'billing.promo.title',
  },
  addPromoCode: {
    defaultMessage: 'Add Promo Code',
    id: 'billing.promo.ard',
  },
});

const CouponField = () => (
  <Box>
    <FieldHeader title={promoCodeMessages.promoTitle} />
    <Text display="block">0.0 Euros</Text>
    <Button>
      <FormattedMessage {...promoCodeMessages.addPromoCode} />
    </Button>
  </Box>
);

export default CouponField;

