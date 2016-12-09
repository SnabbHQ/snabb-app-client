/* @flow */
import React, {PropTypes} from 'react';
import {connect} from "react-redux"
import {Text, Radio, Image, Space, Flex} from '../../app/components'

const ICONS = {
  bike: require('../../../../assets/images/bike.svg'),
  car: require('../../../../assets/images/car.svg'),
  cargobike: require('../../../../assets/images/cargobike.svg'),
  motorbike: require('../../../../assets/images/motorbike.svg'),
  van: require('../../../../assets/images/van.svg'),
  walk: require('../../../../assets/images/walk.svg'),
  cargobikexl: require('../../../../assets/images/cargobikeXL.svg')
};

const TransportType = ({type, quotes}) => {
  const quote = quotes[type];
  const isDisabled = !quote || quote.errors;

  return (
    <Flex align="center">
      <Image
        alt={'alt'}
        src={ICONS.bike}
      />
      <Space x={2}/>
      <Text>Bike</Text>
      <Space auto/>
      <Radio
        circle
        label=""
        name="radio_1"
      />
    </Flex>
  )
}

TransportType.PropTypes = {
  type: PropTypes.object.isRequired,
  quotes: PropTypes.object.isRequired
}

TransportType.DefaultProps = {
  disabled: false
}

export default connect(
  (state: State) => ({
    quotes: {}//state.quotes.all,
  }),
  {},
)(TransportType);
