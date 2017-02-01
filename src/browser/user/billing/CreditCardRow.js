/* @flow */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Box, Card, Text, Image, Space} from '../../app/components';

const ICONS = {
  visa: require('../../../common/app/images/cardIconVI.svg'),
  mastercard: require('../../../common/app/images/cardIconMC.svg'),
};

const CreditCardRow = ({type, cards}) => {
  const card = cards[type];

  return (
    <Card backgroundColor="#f6f6f6">
      <Box>
        <Text display="block" size={-1} >Card Number</Text>
        <Box display="flex" >
          <Image
            alt={'alt'}
            src={ICONS.mastercard}
            height={25}
            width={25}
          />
          <Space x={0.5} />
          <Text>MasterCard **** 1864</Text>
        </Box>
      </Box>
      <Space x={2} />
      <Text display="block" size={-1}>EXPIRATION DATE</Text>
      <Text>07 / 20</Text>
    </Card>
  );
};

CreditCardRow.PropTypes = {
  type: PropTypes.object.isRequired,
  cards: PropTypes.object.isRequired,
};

CreditCardRow.DefaultProps = {
  disabled: false,
};

export default connect(
  () => ({
    cards: {}, // state.quotes.all,
  }),
  {},
)(CreditCardRow);
