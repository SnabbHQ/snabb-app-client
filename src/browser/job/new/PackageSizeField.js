/* @flow */
import R from 'ramda';
import React, { PropTypes } from 'react';
import {FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { FieldHeader, Box, Dialog, Space, Button, Text } from '../../app/components';
import jobMessages from '../../../common/job/jobMessages';
import vehicleIcon from '../../../common/app/images/vehicleBadgeBlank.svg';
import TransportType from './TransportType';

class PackageSizeField extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showDialog: false
    };

    this.showDialog = this.showDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
  }

  showDialog() {
    this.setState({ showDialog: true })
  }

  hideDialog() {
    this.setState({ showDialog: false })
  }

  render() {
    const { intl } = this.props;

    return(
      <Box>
        <Dialog
          isVisible={this.state.showDialog}
          title={intl.formatMessage(jobMessages.sizeDetails)}
          onCloseClicked={this.hideDialog}
        >
          <Text bold color="red">
            Hola
          </Text>
        </Dialog>

        <Box display="flex" alignItems="center" marginBottom={1}>
          <FieldHeader icon={vehicleIcon} title={jobMessages.size} marginBottom={0} />
          <Space auto />
          <Button color="primary" onClick={this.showDialog} onPress={this.showDialog}>
            <FormattedMessage {...jobMessages.viewSizeDetails}/>
          </Button>
        </Box>
        <TransportType />
        <TransportType />
      </Box>
    )
  }
}

PackageSizeField.propTypes = {
  quotes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

export default R.compose(
  connect(
    (state: State) => ({
      quotes: {}, // state.quotes.all,
      error: state.user.error,
    }),
  ),
  injectIntl,
)(PackageSizeField);
