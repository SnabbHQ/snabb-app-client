/* @flow */
import R from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import { Space, Box } from '../../app/components';
import jobMessages from '../../../common/delivery/jobMessages';
import PlaceFields from './PlaceFields';
import PackageSizeField from './PackageSizeField';

import pickupIcon from '../../../common/app/images/pickUpBadgeIcon.svg';
import dropIcon from '../../../common/app/images/dropOffBadgeIcon.svg';

type DeliveryFieldsProps = {
  pickupError: ?Error,
  dropOffError: ?Error,
}

const DeliveryFields = ({pickUpError, dropOffError}: DeliveryFieldsProps) => (
    <Box>
      <PlaceFields
        icon={pickupIcon}
        title={jobMessages.pickUp}
        collapsible
        placeType="pickUp"
        error={pickUpError}
      />
      <Space x={1} />
      <PlaceFields
        icon={dropIcon}
        title={jobMessages.dropOff}
        placeType="dropOff"
        error={dropOffError}
      />
      <Space x={1} />
      <PackageSizeField />
      <Space x={1} />
    </Box>
  );

export default R.compose(
  connect(
    (state: State) => ({
      pickUpError: state.delivery.pickUpError,
      dropOffError: state.delivery.dropOffError,
    })
  )
)(DeliveryFields);
