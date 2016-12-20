/* @flow */
import type { State } from '../../common/types';
import React from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import authMessages from '../../common/auth/authMessages';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';
import { login } from '../../common/auth/actions';
import { Button, Input, Link, Box } from '../app/components';
import { Form, focus } from '../app/components-old';

class RegisterFields extends React.Component {

  onFormSubmit = () => {
    this.loginViaPassword();
  };

  loginViaPassword() {
    const { fields, login } = this.props;
    login('password', fields.$values());
  }

  render() {
    const { disabled, fields, intl } = this.props;

    return (
      <Form onSubmit={this.onFormSubmit} small>
        <Box>
          <Input
            {...fields.name}
            disabled={disabled}
            label={intl.formatMessage(authMessages.businessName)}
            labelSize={-1}
            maxLength={1000}
            padding="0.5em"
            type="password"
          />
          <Input
            {...fields.email}
            disabled={disabled}
            label={intl.formatMessage(authMessages.businessEmail)}
            labelSize={-1}
            maxLength={100}
            padding="0.5em"
            type="email"
          />
          <Input
            {...fields.phone}
            disabled={disabled}
            label={intl.formatMessage(authMessages.phone)}
            labelSize={-1}
            maxLength={1000}
            padding="0.5em"
          />
          <Input
            {...fields.password}
            disabled={disabled}
            label={intl.formatMessage(authMessages.passwordLabel)}
            labelSize={-1}
            maxLength={1000}
            padding="0.5em"
            placeholder={intl.formatMessage(authMessages.passwordPlaceholder)}
            type="password"
          />
          <Box marginTop="1em">
            <Button width="100%" disabled={disabled} align="center">
              <FormattedMessage {...buttonsMessages.register} />
            </Button>
          </Box>
        </Box>
      </Form>
    );
  }
}

RegisterFields = focus(RegisterFields, 'error');

RegisterFields = injectIntl(RegisterFields);

RegisterFields = fields({
  path: ['auth', 'email'],
  fields: ['name', 'email', 'phone', 'password'],
})(RegisterFields);

RegisterFields.propTypes = {
  disabled: React.PropTypes.bool.isRequired,
  fields: React.PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  login: React.PropTypes.func.isRequired,
};

export default connect(
  (state: State) => ({
    disabled: state.auth.formDisabled,
    error: state.auth.error,
  }),
  { login },
)(RegisterFields);
