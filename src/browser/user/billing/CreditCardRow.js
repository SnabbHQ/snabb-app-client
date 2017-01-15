/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Box, Text, Image, Space } from '../../app/components';

const ICONS = {
  visa: require('../../../common/app/images/cardIconVI.svg'),
  mastercard: require('../../../common/app/images/cardIconMC.svg'),
};

const CreditCardRow = ({ type, cards }) => {
  const card = cards[type];

  return (
    <Box display="flex" align="center">
      <Space x={2} />
      <Image
        alt={'alt'}
        src={ICONS.visa}
      />
      <Space x={2} />
      <Text>main</Text>
      <Space auto />
      <Text>Expires 11/2018</Text>
      <Space auto />
      <Text>Default Card</Text>
      <Space auto />
      <Text>Delete</Text>
    </Box>
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
