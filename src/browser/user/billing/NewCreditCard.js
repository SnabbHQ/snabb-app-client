/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import buttonMessages from '../../../common/app/buttonsMessages';
import { FormattedMessage } from 'react-intl';
import { Box, Input, Button, Space } from '../../app/components';

type NewCreditCardProps = {
  type: Object,
  cards: Object,
  onCancelClick?: func,
}

const NewCreditCard = ({ type, cards, onCancelClick }: NewCreditCardProps) => {
  const card = cards[type];

  return (
    <Box>
      <Input
        label="Card number"
        name="Card number"
        maxLength={100}
        placeholder={'Card Number'}
        type="text"
      />
      <Box display="flex" justifyContent="space-between">
        <Input
          label="Expiration Date"
          name="CVV"
          maxLength={100}
          placeholder={'CVV'}
          type="text"
        />
        <Space x={0.33} />
        <Input
          label=""
          name="MM/YY"
          maxLength={100}
          placeholder={'MM/YY'}
          marginTop={1}
          type="text"
        />
        <Space x={0.33} />
        <Input
          label="Security Code"
          name="CVV"
          maxLength={100}
          placeholder={'CVV'}
          type="text"
        />
      </Box>
      <Box display="flex">
        <Space auto />
        <Button onClick={onCancelClick}>
          <FormattedMessage {...buttonMessages.cancel} />
        </Button>
        <Button>
          <FormattedMessage {...buttonMessages.save} />
        </Button>
      </Box>
    </Box>
  );
};

NewCreditCard.DefaultProps = {
  disabled: false,
};

export default connect(
  () => ({
    cards: {}, // state.quotes.all,
  }),
  {},
)(NewCreditCard);
