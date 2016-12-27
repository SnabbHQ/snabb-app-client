/* @flow */
import R from 'ramda';
import type { State } from '../../common/types';
import React from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import authMessages from '../../common/auth/authMessages';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';
import { login } from '../../common/auth/actions';
import { Button, Input, Link, Form, focus, Box } from '../app/components';

class LoginFields extends React.Component {

  constructor(props: P) {
    super(props);

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.loginViaPassword = this.loginViaPassword.bind(this);
  }

  onFormSubmit() {
    this.loginViaPassword();
  }

  loginViaPassword() {
    const { fields, login } = this.props;
    login(fields.$values());
  }

  render() {
    const { disabled, fields, intl } = this.props;

    return (
      <Box>
        <Form onSubmit={() => console.log('hola')} small>
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
              <Button type="submit" width="100%" disabled={disabled} align="center">
                <FormattedMessage {...buttonsMessages.logIn} />
              </Button>
            </Box>
          </Box>
        </Form>
        <Link
          marginTop="1em"
          display="block"
          antialiasing
          to="/resetPassword"
          align="end"
          size={-1}
        >
          <FormattedMessage {...authMessages.passwordForgotten} />
        </Link>
      </Box>
    );
  }
}

LoginFields.propTypes = {
  disabled: React.PropTypes.bool.isRequired,
  fields: React.PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  login: React.PropTypes.func.isRequired,
};

LoginFields = focus(LoginFields, 'error');

export default R.compose(
  connect(
    (state: State) => ({
      disabled: state.auth.formDisabled,
      error: state.auth.error,
    }),
    { login },
  ),
  injectIntl,
  fields({
    path: 'login',
    fields: ['email', 'password'],
  }),
)(LoginFields);
