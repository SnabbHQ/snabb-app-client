/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Text, Image, Space } from '../../app/components';
import { Radio, Flex } from '../../app/components-old';

const ICONS = {
  visa: require('../../../../assets/images/cardIconVI.svg'),
  mastercard: require('../../../../assets/images/cardIconMC.svg'),
};

const CreditCardField = ({ type, cards }) => {
  const card = cards[type];

  return (
    <Flex align="center">
      <Radio
        circle
        label=""
        name="radio_1"
      />
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
    </Flex>
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
