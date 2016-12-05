import React, { PropTypes } from 'react';
import { defineMessages } from 'react-intl';
import wrapFields, { wrappedFieldsPropTypes } from '../../../lib/wrapFields';
import styles from './CreditCardFields.scss';
import * as helper from '../../../../common/lib/creditCard.js';

const MESSAGES = defineMessages({
  cardNumberPlaceholder: {
    id: 'creditCardForm.cardNumberPlaceholder',
    defaultMessage: 'Card number'
  },
  cardDatePlaceholder: {
    id: 'creditCardForm.cardDatePlaceholder',
    defaultMessage: 'MM/YY'
  },
  cardNamePlaceholder: {
    id: 'creditCardForm.cardNamePlaceholder',
    defaultMessage: 'Card name'
  }
});

const CreditCardShape = PropTypes.shape({
  cardNumber: PropTypes.string,
  cardDate: PropTypes.string,
  cardCode: PropTypes.string,
  cardName: PropTypes.string
});

const CreditCardFields = React.createClass({
  propTypes: {
    ...wrappedFieldsPropTypes,
    value: CreditCardShape.isRequired,
    cardType: PropTypes.string.isRequired,
    cardCodeName: PropTypes.string.isRequired
  },

  render() {
    const {
      cardType,
      renderers: {
        renderText
      }
    } = this.props;

    return (
      <div className={styles.cardContainer}>
        {renderText('cardNumber', {
          id: 'cardNumber',
          className: [styles.cardNumber, styles[`cardType-${cardType}`]].join(' '),
          mask: helper.cardNumberMask(cardType) })}
        {renderText('cardDate', {
          id: 'cardDate',
          className: styles.cardDate,
          mask: '11//11' })}
        {renderText('cardCode', {
          id: 'cardCode',
          className: styles.cardCode,
          placeholder: this.props.cardCodeName,
          mask: helper.cardCodeMask(cardType) })}
        {renderText('cardName', {
          id: 'cardName',
          className: styles.cardName })}
      </div>
    );
  }
});

export default wrapFields(CreditCardFields, { messages: MESSAGES });
