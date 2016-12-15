import React, { PropTypes } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import ErrorMessage from '../ErrorMessage';
import Button from '../../components-old/Button';
import BillingDetailsFields,
{ BillingDetailsShape } from '../../components-old/BillingDetailsFields';
import layoutStyles from '../../../styles/layout.scss';

const ERROR_MESSAGES = defineMessages({
  genericError: {
    id: 'billingDetailsForm.genericError',
    defaultMessage: 'There is an error'
  }
});

const BillingDetailsForm = React.createClass({
  propTypes: {
    errors: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string })).isRequired,
    isSending: PropTypes.bool.isRequired,
    isChanged: PropTypes.bool.isRequired,
    value: BillingDetailsShape.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
  },

  renderError() {
    // TODO: all error messages should be shown and inputs highlighted PT#126403935
    const hasError = this.props.errors.length > 0;

    if (hasError) {
      return (
        <ErrorMessage
          id='billingDetailsForm.billingDetailsError'
          className={layoutStyles.mbm}
          errors={this.props.errors}
          messages={ERROR_MESSAGES} />
      );
    }
  },

  render() {
    return (
      <form id='billingDetailsForm' onSubmit={this.props.onSubmit}>
        <div className={layoutStyles.mbm}>
          <BillingDetailsFields
            value={this.props.value}
            onChange={this.props.onChange}
            cardType={this.props.cardType}
            cardCodeName={this.props.cardCodeName} />
        </div>
        {this.renderError()}
        <div className={layoutStyles.alignRight}>
          <Button
            id='cancelButton'
            className={layoutStyles.mrm}
            onClick={this.props.onCancel}
            disabled={this.props.isSending || !this.props.isChanged}
            type='button'
            kind='secondary'>
            <FormattedMessage
              id='billingDetailsForm.cancelButton'
              defaultMessage='Cancel' />
          </Button>
          <Button
            id='saveButton'
            disabled={this.props.isSending || !this.props.isChanged}
            kind='primary'
            type='submit'>
            <FormattedMessage
              id='billingDetailsForm.saveButton'
              defaultMessage='Save details' />
          </Button>
        </div>
      </form>
    );
  }
});

export default BillingDetailsForm;
