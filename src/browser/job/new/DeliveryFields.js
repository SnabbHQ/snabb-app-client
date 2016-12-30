/* @flow */
import React from 'react';
import { Space } from '../../app/components-old';
import { Box, Divider } from '../../app/components';
import PlaceFields from './PlaceFields';
import VehicleField from './VehicleField';
import pickupIcon from '../../../../assets/images/pickupBadgeBlank.svg';
import dropIcon from '../../../../assets/images/dropOffBadgeBlank.svg';

const JobFields = () => (
    <Box>
      <PlaceFields icon={pickupIcon} title={'Pick Up'} collapsible placeType="pickUp" />
      <Space x={1} />
      <Divider />
      <Space x={1} />
      <PlaceFields icon={dropIcon} title={'Drop Off'} placeType="dropOff" />
      <Space x={1} />
      <Divider />
      <Space x={1} />
      <VehicleField />
      <Space x={1} />
    </Box>
  );

export default JobFields;
