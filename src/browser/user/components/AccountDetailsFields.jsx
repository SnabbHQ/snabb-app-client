import React, { PropTypes } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import wrapFields, { wrappedFieldsPropTypes } from '../../lib/wrapFields';
import layoutStyles from '../../app/styles/layout.scss';
import gridStyles from '../../app/styles/grid.scss';

// TODO Do not duplicate those messages
const MESSAGES = defineMessages({
  companyNamePlaceholder: {
    id: 'authForm.companyName',
    defaultMessage: 'Company name'
  },
  firstnamePlaceholder: {
    id: 'authForm.firstnamePlaceholder',
    defaultMessage: 'First name'
  },
  lastnamePlaceholder: {
    id: 'authForm.lastnamePlaceholder',
    defaultMessage: 'Last name'
  },
  emailPlaceholder: {
    id: 'authForm.emailPlaceholder',
    defaultMessage: 'Email'
  },
  phonePlaceholder: {
    id: 'authForm.phonePlaceholder',
    defaultMessage: 'Phone (+33 1 23 45 67 89)'
  },
  passwordPlaceholder: {
    id: 'authForm.passwordPlaceholder',
    defaultMessage: 'Password'
  }
});

const AccountDetailsShape = PropTypes.shape({
  photo: PropTypes.string,
  company_name: PropTypes.string,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string
});

const AccountDetailsFields = React.createClass({
  propTypes: {
    ...wrappedFieldsPropTypes,
    value: AccountDetailsShape.isRequired
  },

  render() {
    const {
      renderers: { renderText, renderPhoto },
      client: { picturePathDerived }
    } = this.props;

    return (
      <div>
        <FormattedMessage
          tagName='h2'
          id='AccountDetailsForm.businessInformation'
          defaultMessage='Business information' />
        {renderPhoto('photo', { value: picturePathDerived })}

        <div className={[layoutStyles.mvl, gridStyles.row].join(' ')}>
          <div className={gridStyles.col6}>
            {renderText('company_name')}
          </div>
        </div>

        <FormattedMessage
          tagName='h2'
          id='AccountDetailsForm.generalInformation'
          defaultMessage='General information' />

        <div className={gridStyles.row}>
          <div className={gridStyles.col6}>
            {renderText('firstname')}
          </div>
          <div className={gridStyles.col6}>
            {renderText('lastname')}
          </div>
        </div>
        <div className={gridStyles.row}>
          <div className={gridStyles.col6}>
            {renderText('email', { type: 'email' })}
          </div>
          <div className={gridStyles.col6}>
            {renderText('phone', { type: 'tel' })}
          </div>
        </div>
      </div>
    );
  }
});

export default wrapFields(AccountDetailsFields, { messages: MESSAGES });
