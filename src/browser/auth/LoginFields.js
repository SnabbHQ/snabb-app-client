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
import { Button, Input, Form, focus, Box } from '../app/components';

class LoginFields extends React.Component {

  onFormSubmit = () => {
    this.loginViaPassword();
  }

  loginViaPassword = () => {
    const { fields, login } = this.props;
    login(fields.$values());
  }

  render() {
    const { disabled, fields, intl } = this.props;

    return (
      <Form onSubmit={this.onFormSubmit} small>
        <Box>
          <Input
            {...fields.email}
            disabled={disabled}
            labelSize={-1}
            maxLength={100}
            padding="0.5em"
            placeholder={intl.formatMessage(authMessages.email)}
          />
          <Input
            {...fields.password}
            disabled={disabled}
            labelSize={-1}
            maxLength={1000}
            padding="0.5em"
            placeholder={intl.formatMessage(authMessages.password)}
            type="password"
          />
          <Box marginTop="1em">
            <Button primary onClick={this.loginViaPassword} width="100%" disabled={disabled} align="center">
              <FormattedMessage {...buttonsMessages.logIn} />
            </Button>
          </Box>
        </Box>
      </Form>
    );
  }
}

LoginFields.propTypes = {
  disabled: React.PropTypes.bool.isRequired,
  fields: React.PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  login: React.PropTypes.func.isRequired,
};

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
  focus('error'),
)(LoginFields);
