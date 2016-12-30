/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Box, FieldHeader, Button } from '../../app/components';
import { FormattedMessage } from 'react-intl';
import billingMessages from '../../../common/user/billing/billingMessages';
import CreditCardRow from './CreditCardRow';
import NewCreditCard from './NewCreditCard';

const ICONS = {
  card: require('../../../../assets/images/cardIconTO.svg'),
};

const CreditCardField = ({ type, cards }) => {
  const card = cards[type];

  return (
    <Box>
      <FieldHeader title={billingMessages.cardTitle} />
      <CreditCardRow />
      <NewCreditCard />
      <Button>
        <FormattedMessage {...billingMessages.addCard} />
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
