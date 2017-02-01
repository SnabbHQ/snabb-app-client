/* @flow */
import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { FieldHeader, Box } from '../../app/components';
import jobMessages from '../../../common/job/jobMessages';
import vehicleIcon from '../../../common/app/images/vehicleBadgeBlank.svg';
import TransportType from './TransportType';

const PackageSizeField = () => {
  const renderExclVat = () =>
    // if (R.isEmpty(quotes)) { return }
     (
      <Box>
        <FormattedMessage {...jobMessages.excludeVAT} />
      </Box>
    );

  // ...jobMessages.selectVehicleTitle
  return (
    <Box>
      <FieldHeader icon={vehicleIcon} title={jobMessages.size} />
      {renderExclVat}
      <TransportType />
      <TransportType />
    </Box>
  );
};


PackageSizeField.propTypes = {
  quotes: PropTypes.object.isRequired,
};

export default connect(
  () => ({
    quotes: {}, // state.quotes.all,
  }),
  {},
)(PackageSizeField);
