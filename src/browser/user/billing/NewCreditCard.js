/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import buttonMessages from '../../../common/app/buttonsMessages';
import { FormattedMessage } from 'react-intl';
import { Box, Input, Button, Space } from '../../app/components';

const ICONS = {
  card: require('../../../../assets/images/cardIconTO.svg'),
};

const NewCreditCard = ({ type, cards }) => {
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
        <Button>
          <FormattedMessage {...buttonMessages.cancel} />
        </Button>
        <Button>
          <FormattedMessage {...buttonMessages.save} />
        </Button>
      </Box>
    </Box>
  );
};

NewCreditCard.PropTypes = {
  type: PropTypes.object.isRequired,
  cards: PropTypes.object.isRequired,
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
