import React from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { FormattedMessage } from 'react-intl';
import size from 'lodash/size';
import head from 'lodash/head';
import some from 'lodash/some';
import filter from 'lodash/filter';
import toString from 'lodash/toString';
import {
  createCreditCard,
  deleteCreditCard,
  defaultCreditCard,
  redeemCoupon,
  setBillingDetailsValue,
  updateBillingDetails } from '../../../common/payments/actions';
import {
  DEFAULT_CITY,
  CITIES } from '../../../common/lib/constants';
import configuration from '../../../common/configuration';
import Card from '../../app/components/Card';
import CreditCardsTable from '../components/CreditCardsTable';
import CreditCardForm from '../components/CreditCardForm';
import BillingDetailsForm from '../components/BillingDetailsForm';
import * as creditCardHelper from '../../../common/lib/creditCard.js';
import Wallet from '../components/Wallet';
import CouponForm from '../components/CouponForm';
import styles from './BillingPage.scss';
import gridStyles from '../../app/styles/grid.scss';

const BILLING_DETAILS_FIELDS = [
  'company',
  'address',
  'city',
  'zipcode',
  'country',
  'vat'
];

const BillingPage = React.createClass({
  getInitialState() {
    return {
      couponForm: {
        errors: [],
        successMessage: false,
        isSending: false,
        isValid: false,
        showForm: false,
        value: {
          coupon: ''
        }
      },
      creditCardForm: {
        errors: [],
        isSending: false,
        isValid: false,
        showForm: false,
        cardType: creditCardHelper.DEFAULT_CARD_TYPE,
        cardCodeName: creditCardHelper.DEFAULT_CODE_NAME,
        value: {
          cardNumber: '',
          cardDate: '',
          cardCode: '',
          cardName: ''
        }
      },
      billingDetailsForm: {
        errors: []
      }
    };
  },

  componentWillMount() {
    this.props.setBillingDetailsValue(this.props.billingAccount);
  },

  title: (
    <FormattedMessage
      id='billingPage.pageTitle'
      defaultMessage='Billing' />
  ),
  creditCardsCardTitle: (
    <FormattedMessage
      id='billingPage.creditCardsCardTitle'
      defaultMessage='Credit cards' />
  ),
  walletCardTitle: (
    <FormattedMessage
      id='billingPage.walletCardTitle'
      defaultMessage='Wallet' />
  ),
  billingDetailsCardTitle: (
    <FormattedMessage
      id='billingPage.billingDetailsCardTitle'
      defaultMessage='Billing details' />
  ),

  isValidCoupon({ coupon }) {
    return !!coupon.trim(); // has content
  },

  handleCouponSubmit(e) {
    e.preventDefault();

    const {
      coupon
    } = this.state.couponForm.value;

    this.setState({
      couponForm: { ...this.state.couponForm, isSending: true }
    });

    this.props.redeemCoupon(coupon).then(() => {
      this.setState({
        couponForm: { ...this.getInitialState().couponForm, successMessage: true }
      });
    }).catch((error) => {
      // TODO: handle better error messages #204
      let errors = [];

      if (typeof error !== 'string' && error instanceof Error) {
        errors = error.response.body.errors;
      } else {
        errors = [{ key: 'COUPON_UNKNOWN_ERROR' }];
      }

      this.setState({
        couponForm: { ...this.state.couponForm, isSending: false, errors }
      });
    });
  },

  handleCouponChange(value) {
    const isValid = this.isValidCoupon(value);

    this.setState({
      couponForm: { ...this.state.couponForm, value, errors: [], isValid }
    });
  },

  handleCouponCancel(e) {
    e.preventDefault();

    this.setState({
      couponForm: { ...this.getInitialState().couponForm }
    });
  },

  handleCouponToggle(e) {
    e.preventDefault();

    this.setState({
      couponForm: { ...this.state.couponForm, showForm: !this.state.couponForm.showForm }
    });
  },

  handleCreditCardSubmit(e) {
    e.preventDefault();

    const {
      cardCode,
      cardDate,
      cardName,
      cardNumber
    } = this.state.creditCardForm.value;

    this.setState({
      creditCardForm: { ...this.state.creditCardForm, isSending: true }
    });

    this.props.createCreditCard({
      cardCode,
      cardDate,
      cardName,
      cardNumber
    }).then(() => {
      this.setState({
        creditCardForm: { ...this.getInitialState().creditCardForm }
      });
    }).catch((error) => {
      // TODO: handle better error messages #204
      let errors = [];

      // NOTE: Braintree API error is just a string
      if (typeof error !== 'string' && error instanceof Error) {
        errors = error.response.body.errors;
      } else {
        errors = [{ key: 'CREDIT_CARD_UNKNOWN_ERROR' }];
      }

      this.setState({
        creditCardForm: { ...this.state.creditCardForm, isSending: false, errors }
      });
    });
  },

  handleCreditCardCancel(e) {
    e.preventDefault();

    this.setState({
      creditCardForm: { ...this.getInitialState().creditCardForm }
    });
  },

  handleCreditCardChange(value) {
    const cardType = creditCardHelper.getCardType(value.cardNumber);
    const cardCodeName = creditCardHelper.getCardCodeName(cardType);
    const isValid = this.isValidCreditCard(value);

    this.setState({
      creditCardForm: {
        ...this.state.creditCardForm,
        value,
        cardType,
        cardCodeName,
        errors: [],
        isValid
      }
    });
  },

  handleBillingDetailsChange (values) {
    this.props.setBillingDetailsValue(values);

    this.setState({
      billingDetailsForm: { errors: [] }
    });
  },

  handleBillingDetailsSubmit (e) {
    e.preventDefault();

    this.props.updateBillingDetails(this.props.billingDetailsValue).then(() => {
      this.setState({
        billingDetailsForm: { ...this.getInitialState().billingDetailsForm }
      });
    }).catch((error) => {
      // TODO: handle better error messages #204
      const errors = error.response.body.errors;

      this.setState({
        billingDetailsForm: { errors }
      });
    });;
  },

  handleBillingDetailsCancel () {
    this.handleBillingDetailsChange(this.props.billingAccount);
  },


  isValidCreditCard(value) {
    let isValid = true;
    isValid = isValid && /^(\d\s*){12,20}$/.test(value.cardNumber); // 12 to 20 digits
    isValid = isValid && /^\d{3,4}$/.test(value.cardCode); // 3 to 4 digits
    isValid = isValid && /^\d{2}\/\d{2}$/.test(value.cardDate); // MM/YY format

    return isValid;
  },

  handleCreditCardToggle(e) {
    e.preventDefault();

    this.setState({
      creditCardForm: { ...this.state.creditCardForm, showForm: !this.state.creditCardForm.showForm }
    });
  },

  renderWalletCard() {
    return (
      <Card title={this.walletCardTitle}>
        <Wallet
          className={styles.walletContainer}
          wallet={this.props.wallet} />
        <CouponForm
          {...this.state.couponForm}
          topUpLink={this.props.topUpLink}
          onChange={this.handleCouponChange}
          onSubmit={this.handleCouponSubmit}
          onCancel={this.handleCouponCancel}
          onToggle={this.handleCouponToggle} />
      </Card>
    );
  },

  renderCreditCardsCard() {
    return (
      <Card title={this.creditCardsCardTitle}>
        <CreditCardsTable
          creditCards={this.props.creditCards}
          defaultCreditCard={this.props.defaultCreditCard}
          deleteCreditCard={this.props.deleteCreditCard} />
        <CreditCardForm
          {...this.state.creditCardForm}
          creditCardsTableIsEmpty={size(this.props.creditCards) === 0}
          onChange={this.handleCreditCardChange}
          onSubmit={this.handleCreditCardSubmit}
          onCancel={this.handleCreditCardCancel}
          onToggle={this.handleCreditCardToggle} />
      </Card>
    );
  },

  renderBillingDetailsCard() {
    const {
      billingAccount: originalValues,
      billingDetailsValue: currentValues
    } = this.props;
    const isChanged = some(BILLING_DETAILS_FIELDS, k => toString(originalValues[k]) !== toString(currentValues[k]));

    return (
      <Card title={this.billingDetailsCardTitle}>
        <BillingDetailsForm
          {...this.state.billingDetailsForm}
          value={this.props.billingDetailsValue}
          isSending={this.props.billingDetailsIsSending}
          isChanged={isChanged}
          onChange={this.handleBillingDetailsChange}
          onSubmit={this.handleBillingDetailsSubmit}
          onCancel={this.handleBillingDetailsCancel} />
      </Card>
    );
  },

  render() {
    return (
      <div className={gridStyles.row}>
        <div className={gridStyles.col12}>
          {this.renderWalletCard()}
        </div>
        <div className={gridStyles.col12}>
          {this.renderCreditCardsCard()}
        </div>
        <div className={gridStyles.col12}>
          {this.renderBillingDetailsCard()}
        </div>
      </div>
    );
  }
});

const hooks = {};

function mapStateToProps(state) {
  const {
    client: {
      billingAccount,
      token
    },
    clientBillingDetails: {
      billingDetailsIsSending,
      billingDetailsValue
    },
    creditCards,
    wallets
  } = state;

  const isoCode = CITIES[state.closestCity || DEFAULT_CITY].isoCode;
  const wallet = head(filter(wallets, (w) => w.currency.isoCode === isoCode ));
  const topUpLink = `${configuration.snabbDashboardUrl}/wallets/${wallet.id}/topups/new?access_token=${token}`;

  return {
    billingAccount,
    billingDetailsIsSending,
    billingDetailsValue,
    creditCards,
    isLoading: creditCards == null,
    wallet,
    topUpLink
  };
};

export default provideHooks(hooks)(connect(mapStateToProps, {
  createCreditCard,
  defaultCreditCard,
  deleteCreditCard,
  redeemCoupon,
  setBillingDetailsValue,
  updateBillingDetails
})(BillingPage));
