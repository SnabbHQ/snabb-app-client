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
      <Box display="flex">
        <Input
          name="Card number"
          labelSize={-1}
          maxLength={100}
          placeholder={'Card Number'}
          type="text"
        />
        <Input
          name="MM/YY"
          labelSize={-1}
          maxLength={100}
          placeholder={'MM/YY'}
          type="text"
        />
        <Input
          name="CVV"
          labelSize={-1}
          maxLength={100}
          placeholder={'CVV'}
          type="text"
        />
        <Input
          name="Card Holder Name"
          labelSize={-1}
          maxLength={100}
          placeholder={'Card Holder Name'}
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
