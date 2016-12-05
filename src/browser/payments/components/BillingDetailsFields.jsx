import React, { PropTypes } from 'react';
import { defineMessages } from 'react-intl';
import wrapFields, { wrappedFormPropTypes } from '../../lib/wrapFields';
import layoutStyles from '../../../styles/layout.scss';
import styles from './BillingDetailsFields.scss';

const MESSAGES = defineMessages({
  companyPlaceholder: {
    id: 'billingDetailsForm.companyPlaceholder',
    defaultMessage: 'Company name'
  },
  addressPlaceholder: {
    id: 'billingDetailsForm.addressPlaceholder',
    defaultMessage: 'Address'
  },
  cityPlaceholder: {
    id: 'billingDetailsForm.cityPlaceholder',
    defaultMessage: 'City'
  },
  zipcodePlaceholder: {
    id: 'billingDetailsForm.zipcodePlaceholder',
    defaultMessage: 'Postal code'
  },
  countryPlaceholder: {
    id: 'billingDetailsForm.countryPlaceholder',
    defaultMessage: 'Country'
  },
  vatPlaceholder: {
    id: 'billingDetailsForm.vatPlaceholder',
    defaultMessage: 'VAT number (e.g. GB123456789)'
  }
});

export const BillingDetailsShape = PropTypes.shape({
  company: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  zipcode: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  vat: PropTypes.string.isRequired
});

const BillingDetailsFields = React.createClass({
  propTypes: {
    ...wrappedFormPropTypes,
    value: BillingDetailsShape.isRequired
  },

  render() {
    const {
      renderers: {
        renderText
      }
    } = this.props;

    return (
      <div>
        <div className={layoutStyles.flexContainer}>
          {renderText('company', { className: styles.company })}
          {renderText('address', { className: styles.address })}
        </div>
        <div className={layoutStyles.flexContainer}>
          {renderText('city', { className: styles.city })}
          {renderText('zipcode', { className: styles.zipcode })}
          {renderText('country', { className: styles.country })}
          {renderText('vat', { className: styles.vat })}
        </div>
      </div>
    );
  }
});

export default wrapFields(BillingDetailsFields, { messages: MESSAGES });



// WEBPACK FOOTER //
// ./src/components/BillingDetailsFields/index.js
