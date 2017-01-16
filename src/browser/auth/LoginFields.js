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
import { Button, CenteredBox, Input, Form, focus, Box, Loading } from '../app/components';
import FormError from './FormError';

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
      <Form onSubmit={this.onFormSubmit}>
        <Box>
          <Input
            {...fields.email}
            disabled={disabled}
            maxLength={100}
            placeholder={intl.formatMessage(authMessages.email)}
          />
          <Input
            {...fields.password}
            disabled={disabled}
            maxLength={100}
            placeholder={intl.formatMessage(authMessages.password)}
            type="password"
          />
          <CenteredBox>
            <FormError />
            {disabled &&
              <Loading marginVertical={1} />
            }
          </CenteredBox>
          <CenteredBox>
            <Button size={1} accent onClick={this.loginViaPassword} disabled={disabled} align="center">
              <FormattedMessage {...buttonsMessages.logIn} />
            </Button>
          </CenteredBox>
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
