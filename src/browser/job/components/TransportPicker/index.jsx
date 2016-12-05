import React, { PropTypes } from 'react';
import cx from 'classnames';
import camelCase from 'lodash/camelCase';
import { FormattedNumber, FormattedMessage, intlShape, injectIntl, defineMessages } from 'react-intl';
import styles from './TransportPicker.scss';

const ICONS = {
  bike: require('../../../assets/images/bike.svg'),
  car: require('../../../assets/images/car.svg'),
  cargobike: require('../../../assets/images/cargobike.svg'),
  motorbike: require('../../../assets/images/motorbike.svg'),
  van: require('../../../assets/images/van.svg'),
  walk: require('../../../assets/images/walk.svg'),
  cargobikexl: require('../../../assets/images/cargobikeXL.svg')
};

const MESSAGES = defineMessages({
  walkLabel: {
    id: 'transportPicker.walkLabel',
    defaultMessage: 'Walker'
  },
  bikeLabel: {
    id: 'transportPicker.bikeLabel',
    defaultMessage: 'Bike'
  },
  cargobikeLabel: {
    id: 'transportPicker.cargobikeLabel',
    defaultMessage: 'Cargobike XL'
  },
  cargobikexlLabel: {
    id: 'transportPicker.cargobikexlLabel',
    defaultMessage: 'Cargobike'
  },
  motorbikeLabel: {
    id: 'transportPicker.motorbikeLabel',
    defaultMessage: 'Motorbike'
  },
  carLabel: {
    id: 'transportPicker.carLabel',
    defaultMessage: 'Car'
  },
  vanLabel: {
    id: 'transportPicker.vanLabel',
    defaultMessage: 'Van'
  },
  jobDistanceNotAllowed: {
    id: 'transportPicker.jobDistanceNotAllowed',
    defaultMessage: 'Trip distance too long'
  }
});

const TransportPicker = React.createClass({
  propTypes: {
    intl: intlShape.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    quotes: PropTypes.object.isRequired,
    value: PropTypes.string
  },

  handleChange(e) {
    this.props.onChange(e.target.value);
  },

  renderError(error) {
    const { formatMessage } = this.props.intl;

    const message = MESSAGES[camelCase(error.key)];
    return message ? formatMessage(message) : error.message;

    return <p>{error}</p>;
  },

  renderEta(quote) {
    if (quote.pickupEtaOptimistic) {
      return (
        <FormattedMessage
          id='transportPicker.eta'
          defaultMessage='Estimated pickup in {range} minutes'
          values={{
            range: (
              <strong className={styles.transportEtaDuration}>
                <FormattedMessage
                  id='transportPicker.etaRange'
                  defaultMessage='{optimistic}'
                  values={{
                    optimistic: quote.pickupEtaOptimistic
                  }} />
              </strong>
            )
          }} />
      );
    }

    return (
      <FormattedMessage
        id='transportPicker.noEta'
        defaultMessage='High demand! Searching for a courier' />
    );
  },

  renderTransportLabel(type, quote) {
    const label = (
      <p>
        <strong>{this.props.intl.formatMessage(MESSAGES[`${type}Label`])}</strong>
      </p>
    );

    if (!quote) { return label; }

    if (quote.errors) {
      return (
        <div>
          {label}
          <p>{this.renderError(quote.errors)}</p>
        </div>
      );
    }

    return (
      <div>
        {label}
        <p>{this.renderEta(quote)}</p>
      </div>
    );
  },

  renderTransportPrice(quote) {
    if (!quote || quote.errors) { return; }

    return (
      <strong className={styles.transportPrice}>
        <FormattedNumber
          value={quote.finalTotalAmount}
          style='currency'
          currency={quote.currency.isoCode} />
      </strong>
    );
  },

  renderTransport(type) {
    const quote = this.props.quotes[type];
    const isDisabled = !quote || quote.errors;

    const classes = cx({
      [styles.transport]: true,
      [styles.disabled]: isDisabled
    });
    return (
      <label key={`transport-${type}`} className={classes}>
        <table className={styles.transportTable}>
          <tbody>
          <tr>
            <td className={styles.transportIconCell}>
              <img src={ICONS[type]} />
            </td>
            <td className={styles.transportLabelCell}>
              {this.renderTransportLabel(type, quote)}
            </td>
            <td className={styles.transportPriceCell}>
              {this.renderTransportPrice(quote)}
            </td>
            <td className={styles.transportCheckboxCell}>
              <input
                checked={!isDisabled && !!quote && this.props.value === type}
                disabled={isDisabled}
                name={this.props.name}
                onChange={this.handleChange}
                type='radio'
                value={type} />
            </td>
          </tr>
          </tbody>
        </table>
      </label>
    );
  },

  render() {
    return (
      <div>{this.props.transportTypes.map(this.renderTransport)}</div>
    );
  }
});

export default injectIntl(TransportPicker);
