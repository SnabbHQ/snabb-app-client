/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Box, Text, Button } from '../../app/components';
import { defineMessages, FormattedMessage } from 'react-intl';
import CreditCardRow from './CreditCardRow';
import NewCreditCard from './NewCreditCard';

const ICONS = {
  card: require('../../../../assets/images/cardIconTO.svg'),
};

const creditCardMessages = defineMessages({
  addCard: {
    defaultMessage: 'Add Credit Card',
    id: 'billing.card.ard',
  },
});

const CreditCardField = ({ type, cards }) => {
  const card = cards[type];

  return (
    <Box>
      <Text>Credit Cards</Text>
      <CreditCardRow />
      <NewCreditCard />
      <Button>
        <FormattedMessage {...creditCardMessages.addCard} />
      </Button>
    </Box>
  );
};

CreditCardField.PropTypes = {
  type: PropTypes.object.isRequired,
  cards: PropTypes.object.isRequired,
};

CreditCardField.DefaultProps = {
  disabled: false,
};

export default connect(
  () => ({
    cards: {}, // state.quotes.all,
  }),
  {},
)(CreditCardField);
