/* @flow */
import type { State } from '../../common/types';
import React from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import authMessages from '../../common/auth/authMessages';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';
import { resetPassword } from '../../common/auth/actions';
import { Form, Button, Input, Link, Box } from '../app/components';
import { focus } from '../app/components-old';

type LocalState = {
  recoveryEmailSent: boolean,
  disabled: boolean,
};

class ResetPasswordFields extends React.Component {

  state: LocalState = {
    recoveryEmailSent: false,
    disabled: true,
  };

  onFormSubmit = () => {
    this.resetPassword();
  }

  resetPassword() {
    const { fields, resetPassword } = this.props;
    const { email } = fields.$values();
    resetPassword(email);
    this.setState({
      disabled: false,
      recoveryEmailSent: true,
    });
  }

  render() {
    const { disabled, fields, intl } = this.props;

    return (
      <Form onSubmit={this.onFormSubmit} small>
        <Box>
          <Input
            {...fields.email}
            disabled={disabled}
            label={intl.formatMessage(authMessages.emailLabel)}
            labelSize={-1}
            maxLength={100}
            padding="0.5em"
            placeholder={intl.formatMessage(authMessages.emailPlaceholder)}
          />
          <Box marginTop="1em">
            <Button width="100%" disabled={disabled} align="center">
              <FormattedMessage {...buttonsMessages.resetPassword} />
            </Button>
          </Box>
        </Box>
      </Form>
    );
  }
}

ResetPasswordFields = focus(ResetPasswordFields, 'error');

ResetPasswordFields = injectIntl(ResetPasswordFields);

ResetPasswordFields = fields({
  path: ['auth', 'email'],
  fields: ['email'],
})(ResetPasswordFields);

ResetPasswordFields.propTypes = {
  disabled: React.PropTypes.bool.isRequired,
  fields: React.PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  resetPassword: React.PropTypes.func.isRequired,
};

export default connect(
  (state: State) => ({
    error: state.auth.error,
  }),
  resetPassword,
)(ResetPasswordFields);
