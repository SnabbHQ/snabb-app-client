import React, { PropTypes } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import ErrorMessage from '../ErrorMessage';
import Button from '../../components-old/Button';
import CouponFields from '../../components-old/CouponFields';
import textStyles from '../../../styles/text.scss';
import layoutStyles from '../../../styles/layout.scss';

const MESSAGES = defineMessages({
  // error.key: 'COUPON_CODE_NOT_FOUND'
  couponCodeNotFound: {
    id: 'couponForm.couponCodeNotFound',
    defaultMessage: 'Coupon code not found'
  },
  // error.key: 'COUPON_NOT_AVAILABLE'
  couponNotAvailable: {
    id: 'couponForm.couponNotAvailable',
    defaultMessage: 'Coupon not available for this job'
  },
  // error.key: 'COUPON_UNKNOWN_ERROR'
  couponUnknownError: {
    id: 'couponForm.couponUnknownError',
    defaultMessage: 'Coupon code not valid'
  }
});

const CouponForm = React.createClass({
  propTypes: {
    value: PropTypes.shape({
      coupon: PropTypes.string
    }).isRequired,
    errors: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string })).isRequired,
    successMessage: PropTypes.bool.isRequired,
    isSending: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    showForm: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    topUpLink: PropTypes.string.isRequired
  },

  renderError() {
    const hasError = this.props.errors.length > 0;

    if (hasError) {
      return (
        <ErrorMessage
          id='wallet.walletError'
          className={layoutStyles.mbm}
          errors={this.props.errors}
          messages={MESSAGES} />
      );
    }
  },

  renderSuccess() {
    if (this.props.successMessage) {
      return (
        <p id='feedbackMessage' className={[textStyles.green, layoutStyles.mbm].join(' ')}>
          <FormattedMessage
            id='couponForm.couponSuccess'
            defaultMessage='Coupon redeemed successfully.' />
        </p>
      );
    }
  },

  renderShowFormLink() {
    return (
      <div>
        {this.renderSuccess()}
        <a id='addCouponLink' href='#' onClick={this.props.onToggle}>
          <FormattedMessage id='billingPage.addCouponLink' defaultMessage='Add coupon' />
        </a>
        <a href={this.props.topUpLink} className={layoutStyles.mlm} target="_blank">
          <FormattedMessage id='billingPage.topUpLink' defaultMessage='Buy credits' />
        </a>
      </div>
    );
  },

  render() {
    if (!this.props.showForm) {
      return this.renderShowFormLink();
    }

    return (
      <form id='couponForm' onSubmit={this.props.onSubmit} autoComplete='off'>
        <div className={layoutStyles.mbm}>
          <CouponFields
            value={this.props.value}
            onChange={this.props.onChange} />
        </div>
        {this.renderError()}
        <div className={layoutStyles.alignRight}>
          <Button
            id = 'cancelButton'
            className={layoutStyles.mrm}
            onClick={this.props.onCancel}
            type='button'
            kind='secondary'>
            <FormattedMessage
              id='couponForm.cancelButton'
              defaultMessage='Cancel' />
          </Button>

          <Button
            id = 'saveButton'
            disabled={this.props.isSending || !this.props.isValid}
            kind='primary'
            type='submit'>
            <FormattedMessage
              id='couponForm.saveButton'
              defaultMessage='Redeem coupon' />
          </Button>
        </div>
      </form>
    );
  }
});

export default CouponForm;
