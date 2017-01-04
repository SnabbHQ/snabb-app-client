/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Radio, Space, Flex } from '../../app/components-old';
import { Text, Image } from '../../app/components';

const ICONS = {
  bike: require('../../../common/app/images/bike.svg'),
  car: require('../../../common/app/images/car.svg'),
  cargobike: require('../../../common/app/images/cargobike.svg'),
  motorbike: require('../../../common/app/images/motorbike.svg'),
  van: require('../../../common/app/images/van.svg'),
  walk: require('../../../common/app/images/walk.svg'),
  cargobikexl: require('../../../common/app/images/cargobikeXL.svg'),
};

const TransportType = ({ type, quotes }) => {
  const quote = quotes[type];
  const isDisabled = !quote || quote.errors;

  return (
    <Flex align="center">
      <Image
        alt={'alt'}
        src={ICONS.bike}
      />
      <Space x={2} />
      <Text>Bike</Text>
      <Space auto />
      <Radio
        circle
        label=""
        name="radio_1"
      />
    </Flex>
  );
};

TransportType.PropTypes = {
  type: PropTypes.object.isRequired,
  quotes: PropTypes.object.isRequired,
};

TransportType.DefaultProps = {
  disabled: false,
};

export default connect(
  () => ({
    quotes: {}, // state.quotes.all,
  }),
  {},
)(TransportType);
