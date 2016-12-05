import React, { PropTypes } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import wrapFields, { wrappedFieldsPropTypes } from '../../lib/wrapFields';
import gridStyles from '../../app/styles/grid.scss';

const MESSAGES = defineMessages({
  currentPasswordPlaceholder: {
    id: 'AccountDetailsForm.currentPassword',
    defaultMessage: 'Current password'
  },
  passwordPlaceholder: {
    id: 'AccountDetailsForm.newPassword',
    defaultMessage: 'New password'
  }
});

const AccountPasswordShape = PropTypes.shape({
  password: PropTypes.string,
  current_password: PropTypes.string
});

const AccountPasswordFields = React.createClass({
  propTypes: {
    ...wrappedFieldsPropTypes,
    value: AccountPasswordShape.isRequired
  },

  render() {
    const {
      renderers: { renderText }
    } = this.props;

    return (
      <div>
        <FormattedMessage
          tagName='h2'
          id='AccountDetailsForm.changePassword'
          defaultMessage='Change your password' />

        <div className={gridStyles.row}>
          <div className={gridStyles.col6}>
            {renderText('current_password', { type: 'password' })}
          </div>
          <div className={gridStyles.col6}>
            {renderText('password', { type: 'password' })}
          </div>
        </div>
      </div>
    );
  }
});

export default wrapFields(AccountPasswordFields, { messages: MESSAGES });
