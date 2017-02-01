/* @flow */
import React from 'react';
import {connect} from 'react-redux';
import buttonMessages from '../../../common/app/buttonsMessages';
import {FormattedMessage} from 'react-intl';
import {Box, Card, Input, Button, Space, Dropdown, Text} from '../../app/components';

type NewCreditCardProps = {
  type: Object,
  cards: Object,
  onCancelClick?: func,
}

const NewCreditCard = ({type, cards, onCancelClick}: NewCreditCardProps) => {
  const card = cards[type];

  const optionsMonths = [
    '01', '02', '03', '04', '05', '06','07', '08', '09','10', '11', '12',
  ];

  const getYearOptions = () => {
    let years = [];
    let twoDigitsCurrentYear = parseInt(new Date().getFullYear().toString().substr(2,2));

    for (let i = 0; i < 20; i++) {
      years.push(twoDigitsCurrentYear + i);
    }

    return years;
  };

  return (
    <Card>
      <Box display='flex'>
        <Input
          label="Card number"
          name="cardNumber"
          maxLength={100}
          placeholder={'Card Number'}
          type="text"
          width={14}
        />
      </Box>
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
            <Space />
            <Text>/</Text>
            <Space />
            <Dropdown
              name="expirationYear"
              options={getYearOptions()}
            />
          </Box>
        </Box>
        <Space x={1} />
        <Input
          label="Security Code"
          name="CVV"
          maxLength={3}
          placeholder={'CVV'}
          type="text"
        />
      </Box>
      <Box display="flex" >
        <Button gray onClick={onCancelClick} >
          <FormattedMessage {...buttonMessages.cancel} />
        </Button>
        <Space />
        <Button accent>
          <FormattedMessage {...buttonMessages.save} />
        </Button>
      </Box>
    </Card>
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
