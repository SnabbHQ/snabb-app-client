import React, { PropTypes } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import ErrorMessage from '../ErrorMessage';
import Button from '../../components/Button';
import CreditCardFields from '../../components/CreditCardFields';
import layoutStyles from '../../../styles/layout.scss';

const ERROR_MESSAGES = defineMessages({
  // error.key = PAYMENT_PLATFORM_ERROR
  paymentPlatformError: {
    id: 'creditCardForm.paymentPlatformError',
    defaultMessage: 'Payment platform error'
  },
  // error.key = CREDIT_CARD_UNKNOWN_ERROR
  creditCardUnknownError: {
    id: 'creditCardForm.creditCardUnknownError',
    defaultMessage: 'Credit card details are invalid'
  }
});

const CreditCardForm = React.createClass({
  propTypes: {
    errors: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string })).isRequired,
    isSending: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    showForm: PropTypes.bool.isRequired,
    cardType: PropTypes.string.isRequired,
    cardCodeName: PropTypes.string.isRequired,
    creditCardsTableIsEmpty: PropTypes.bool.isRequired,
    value: PropTypes.shape({
      cardNumber: PropTypes.string,
      cardDate: PropTypes.string,
      cardCode: PropTypes.string,
      cardName: PropTypes.string
    }).isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired
  },

  renderError() {
    // TODO: all error messages should be shown and inputs highlighted PT#126403935
    const hasError = this.props.errors.length > 0;

    if (hasError) {
      return (
        <ErrorMessage
          id='wallet.walletError'
          className={layoutStyles.mbm}
          errors={this.props.errors}
          messages={ERROR_MESSAGES} />
      );
    }
  },

  renderShowFormLink() {
    return (
      <a href='#' onClick={this.props.onToggle}>
        <FormattedMessage id='billingPage.addCardButton' defaultMessage='Add credit card' />
      </a>
    );
  },

  render() {
    if (!this.props.showForm && !this.props.creditCardsTableIsEmpty) {
      return this.renderShowFormLink();
    }

    return (
      <form id='creditCardForm' onSubmit={this.props.onSubmit} autoComplete='off'>
        <div className={layoutStyles.mbm}>
          <CreditCardFields
            value={this.props.value}
            onChange={this.props.onChange}
            cardType={this.props.cardType}
            cardCodeName={this.props.cardCodeName} />
        </div>
        {this.renderError()}
        <div className={layoutStyles.alignRight}>
          <Button
            id='cancelButton'
            disabled={this.props.creditCardsTableIsEmpty}
            className={layoutStyles.mrm}
            onClick={this.props.onCancel}
            type='button'
            kind='secondary'>
            <FormattedMessage
              id='creditCardForm.cancelButton'
              defaultMessage='Cancel' />
          </Button>
          <Button
            id='saveButton'
            disabled={this.props.isSending || !this.props.isValid}
            kind='primary'
            type='submit'>
            <FormattedMessage
              id='creditCardForm.saveButton'
              defaultMessage='Save card' />
          </Button>
        </div>
      </form>
    );
  }
});

export default CreditCardForm;
