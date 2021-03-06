/* @flow */
import R from 'ramda';
import React, { PropTypes } from 'react';
import {FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { FieldHeader, Box, Dialog, Space, Button, Text } from '../../app/components';
import jobMessages from '../../../common/delivery/jobMessages';
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

  renderPackageSizes(intl, onSelectedPackageSize, quote, selectedPackageId) {

    return (
      <Box display="flex"  justifyContent="space-between">
        <PackageSize
          selected={selectedPackageId === "small"}
          disabled={!(quote && quote.prices.small)}
          title={intl.formatMessage(jobMessages.sizeSmall)}
          id="small"
          onPress={onSelectedPackageSize}
        />

        <PackageSize
          selected={selectedPackageId === "medium"}
          disabled={!(quote && quote.prices.medium)}
          title={intl.formatMessage(jobMessages.sizeMedium)}
          id="medium"
          onPress={onSelectedPackageSize}
        />

        <PackageSize
          selected={selectedPackageId === "big"}
          disabled={!(quote && quote.prices.big)}
          title={intl.formatMessage(jobMessages.sizeBig)}
          id="big"
          onPress={onSelectedPackageSize}
        />
      </Box>
    )
  }

  render() {
    const { intl, onSelectedPackageSize, quote, selectedPackageId } = this.props;

    return(
      <Box>
        <Dialog
          isVisible={this.state.showDialog}
          title={intl.formatMessage(jobMessages.sizeDetails)}
          onCloseClicked={this.hideDialog}
        >
          <Text bold color="red">
            Info to include here
          </Text>
        </Dialog>

        <Box display="flex" alignItems="center" marginBottom={1}>
          <FieldHeader icon={sizesIcon} title={jobMessages.size} marginBottom={0} />
          <Space auto />
          <Button color="primary" onClick={this.showDialog} onPress={this.showDialog}>
            <FormattedMessage {...jobMessages.viewSizeDetails}/>
          </Button>
        </Box>

        {this.renderPackageSizes(intl, onSelectedPackageSize, quote, selectedPackageId)}

      </Box>
    )
  }
}

PackageSizeField.propTypes = {
  intl: intlShape.isRequired,
  onSelectedPackageSize: PropTypes.func,
  quote: PropTypes.object,
  selectedPackageId: PropTypes.string,
};

export default R.compose(
  connect(
    (state: State) => ({
      quote: state.delivery.quote,
      error: state.delivery.error,
    }),
  ),
  injectIntl,
)(PackageSizeField);
