/* @flow */
import R from 'ramda';
import React, { PropTypes } from 'react';
import {FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { FieldHeader, Box, Dialog, Space, Button, Text } from '../../app/components';
import jobMessages from '../../../common/job/jobMessages';
import sizesIcon from '../../../common/app/images/sizesBadgeIcon.svg';
import PackageSize from './PackageSize';

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
          <FieldHeader icon={sizesIcon} title={jobMessages.size} marginBottom={0} />
          <Space auto />
          <Button color="primary" onClick={this.showDialog} onPress={this.showDialog}>
            <FormattedMessage {...jobMessages.viewSizeDetails}/>
          </Button>
        </Box>
        <Box display="flex"  justifyContent="space-between">
          <PackageSize
            title={intl.formatMessage(jobMessages.sizeSmall)}
            icon="small"
          />
          <PackageSize
            title={intl.formatMessage(jobMessages.sizeMedium)}
            icon="medium"
          />
          <PackageSize
            title={intl.formatMessage(jobMessages.sizeLarge)}
            icon="large"
          />
        </Box>

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
