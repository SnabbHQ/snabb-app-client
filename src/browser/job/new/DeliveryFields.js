/* @flow */
import R from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import { Space, Box } from '../../app/components';
import jobMessages from '../../../common/delivery/jobMessages';
import PlaceFields from './PlaceFields';
import PackageSizeField from './PackageSizeField';

import pickupIcon from '../../../common/app/images/pickupBadgeIcon.svg';
import dropIcon from '../../../common/app/images/dropoffBadgeIcon.svg';

type DeliveryFieldsProps = {
  pickupError: ?Error,
  dropoffError: ?Error,
  //TODO - onSelectedPackageSize:
  selectedId: ?string,
}

const DeliveryFields = ({onSelectedPackageSize, pickupError, dropoffError, selectedPackageId }: DeliveryFieldsProps) => (
    <Box>
      <PlaceFields
        icon={pickupIcon}
        title={jobMessages.pickup}
        collapsible
        placeType="pickup"
        error={pickupError}
      />
      <Space x={1} />
      <PlaceFields
        icon={dropIcon}
        title={jobMessages.dropoff}
        placeType="dropoff"
        error={dropoffError}
      />
      <Space x={1} />
      <PackageSizeField
        selectedPackageId={selectedPackageId}
        onSelectedPackageSize={onSelectedPackageSize}
      />
      <Space x={1} />
    </Box>
  );

export default R.compose(
  connect(
    (state: State) => ({
      pickupError: state.delivery.pickupError,
      dropoffError: state.delivery.dropoffError,
    })
  )
)(DeliveryFields);
