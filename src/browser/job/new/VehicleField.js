/* @flow */
import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { View } from '../../app/components-old';
import { FieldHeader } from '../../app/components';
import jobMessages from '../../../common/job/jobMessages';
import vehicleIcon from '../../../common/app/images/vehicleBadgeBlank.svg';
import TransportType from './TransportType';

const VehicleField = () => {
  const renderExclVat = () =>
    // if (R.isEmpty(quotes)) { return }

     (
      <View>
        <FormattedMessage {...jobMessages.excludeVAT} />
      </View>
    );

  // ...jobMessages.selectVehicleTitle
  return (
    <View>
      <FieldHeader icon={vehicleIcon} title={jobMessages.selectVehicle} />
      {renderExclVat}
      <TransportType />
      <TransportType />
    </View>
  );
};


VehicleField.propTypes = {
  quotes: PropTypes.object.isRequired,
};

export default connect(
  () => ({
    quotes: {}, // state.quotes.all,
  }),
  {},
)(VehicleField);
