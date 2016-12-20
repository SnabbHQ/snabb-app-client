/* @flow */
import type { State } from '../../common/types';
import React from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import emailMessages from '../../common/auth/authMessages';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';
import { login } from '../../common/auth/actions';
import { Button, Input, Box, Card } from '../app/components';
import { Form, focus } from '../app/components-old';

class LoginFields extends React.Component {

  onFormSubmit = () => {
    this.signInViaPassword();
  };

  signInViaPassword() {
    const { fields, signIn } = this.props;
    signIn('password', fields.$values());
  }

  render() {
    const { disabled, fields, intl } = this.props;

    return (
      <Form onSubmit={this.onFormSubmit} small>
        <Card width="400px">
          <Input
            {...fields.email}
            disabled={disabled}
            label={intl.formatMessage(emailMessages.emailLabel)}
            labelSize={-1}
            maxLength={100}
            padding="0.5em"
            placeholder={intl.formatMessage(emailMessages.emailPlaceholder)}
          />
          <Input
            {...fields.password}
            disabled={disabled}
            label={intl.formatMessage(emailMessages.passwordLabel)}
            labelSize={-1}
            maxLength={1000}
            padding="0.5em"
            placeholder={intl.formatMessage(emailMessages.passwordPlaceholder)}
            type="password"
          />
          <Box marginTop="1em">
            <Button width="100%" disabled={disabled} align="center">
              <FormattedMessage {...buttonsMessages.signIn} />
            </Button>
          </Box>
        </Card>
      </Form>
    );
  }
}

LoginFields = focus(LoginFields, 'error');

LoginFields = injectIntl(LoginFields);

LoginFields = fields({
  path: ['auth', 'email'],
  fields: ['email', 'password'],
})(LoginFields);

LoginFields.propTypes = {
  disabled: React.PropTypes.bool.isRequired,
  fields: React.PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  signIn: React.PropTypes.func.isRequired,
};

export default connect(
  (state: State) => ({
    disabled: state.auth.formDisabled,
    error: state.auth.error,
  }),
  { login },
)(LoginFields);
