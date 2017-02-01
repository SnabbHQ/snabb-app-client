/* @flow */
import React from 'react';
import {connect} from 'react-redux';
import buttonMessages from '../../../common/app/buttonsMessages';
import {FormattedMessage} from 'react-intl';
import {Box, Input, Button, Space, Dropdown, Text} from '../../app/components';

type NewCreditCardProps = {
  type: Object,
  cards: Object,
  onCancelClick?: func,
}

const NewCreditCard = ({type, cards, onCancelClick}: NewCreditCardProps) => {
  const card = cards[type];

  const optionsMonths = [
    '01', '02', '03'
  ];

  const optionsYears = [
    '17', '18', '19'
  ];

  return (
    <Box>
      <Input
        label="Card number"
        name="cardNumber"
        maxLength={100}
        placeholder={'Card Number'}
        type="text"
        width={14}
      />
      <Box display="flex">
        <Box>
          <Text size={-1}>
            EXPIRATION DATE
          </Text>
          <Box display="flex">
            <Dropdown
              name="expirationMonth"
              options={optionsMonths}
            />
            <Space x={0.33} />
            <Text>/</Text>
            <Space x={0.33} />
            <Dropdown
              name="expirationYear"
              options={optionsYears}
            />
          </Box>
        </Box>
        <Space x={0.33} />
        <Input
          label="Security Code"
          name="CVV"
          maxLength={3}
          placeholder={'CVV'}
          type="text"
        />
      </Box>
      <Box display="flex" >
        <Space auto />
        <Button gray onClick={onCancelClick} >
          <FormattedMessage {...buttonMessages.cancel} />
        </Button>
        <Space x={0.33} />
        <Button accent>
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
