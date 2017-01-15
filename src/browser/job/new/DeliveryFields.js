/* @flow */
import React from 'react';
import { Space, Box, Divider } from '../../app/components';
import jobMessages from '../../../common/job/jobMessages';
import PlaceFields from './PlaceFields';
import VehicleField from './VehicleField';
import pickupIcon from '../../../common/app/images/pickupBadgeBlank.svg';
import dropIcon from '../../../common/app/images/dropOffBadgeBlank.svg';

const JobFields = () => (
    <Box>
      <PlaceFields icon={pickupIcon} title={jobMessages.pickUp} collapsible placeType="pickUp" />
      <Space x={1} />
      <Divider />
      <Space x={1} />
      <PlaceFields icon={dropIcon} title={jobMessages.dropOff} placeType="dropOff" />
      <Space x={1} />
      <Divider />
      <Space x={1} />
      <VehicleField />
      <Space x={1} />
    </Box>
  );

export default JobFields;
