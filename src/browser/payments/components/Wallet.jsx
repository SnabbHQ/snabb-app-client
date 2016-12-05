import React, { PropTypes } from 'react';
import { FormattedNumber } from 'react-intl';
import ErrorMessage from '../../app/components/ErrorMessage';
import layoutStyles from '../../app/styles/layout.scss';

const ERRORS = [{ key: 'LOAD_WALLET_ERROR' }];
const MESSAGES = {
  loadWalletError: {
    id: 'wallet.loadWalletError',
    defaultMessage: 'There was an error loading the wallet.'
  }
};

const WalletShape = PropTypes.shape({
  amount: PropTypes.number.isRequred,
  currency: PropTypes.shape({
    isoCode: PropTypes.string.isRequired
  })
});

const Wallet = React.createClass({
  propTypes: {
    wallet: WalletShape.isRequired
  },

  render() {
    if (!this.props.wallet) {
      // If the user doesn't have a billing address the API returns `null` wallet
      return (
        <ErrorMessage
          id='wallet.walletError'
          className={layoutStyles.mbm}
          errors={ERRORS}
          messages={MESSAGES} />
      );
    }

    const {
      amount,
      currency: { isoCode }
    } = this.props.wallet;

    return (
      <div id='walletAmount' className={this.props.className}>
        <FormattedNumber
          value={amount}
          style='currency'
          currency={isoCode} />
      </div>
    );
  }
});

export default Wallet;
