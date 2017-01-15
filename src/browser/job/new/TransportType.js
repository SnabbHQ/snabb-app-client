/* @flow */
import React, { PropTypes } from 'react';
import { Space, Box, Text, Image } from '../../app/components';

const ICONS = {
  bike: require('../../../common/app/images/bike.svg'),
  car: require('../../../common/app/images/car.svg'),
  cargoBike: require('../../../common/app/images/cargoBike.svg'),
  motorbike: require('../../../common/app/images/motorbike.svg'),
  van: require('../../../common/app/images/van.svg'),
  walk: require('../../../common/app/images/walk.svg'),
  cargoBikeXL: require('../../../common/app/images/cargoBikeXL.svg'),
};

const TransportType = () => (
    <Box display="flex" align="center">
      <Image
        alt={'alt'}
        src={ICONS.bike}
      />
      <Space x={2} />
      <Text>Bike</Text>
      <Space auto />
    </Box>
  );

TransportType.DefaultProps = {
  disabled: false,
};

export default TransportType;
