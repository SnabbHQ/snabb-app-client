/* @flow */
import R from 'ramda';
import type { State } from '../../../common/types';
import React from 'react';
import buttonsMessages from '../../../common/app/buttonsMessages';
import authMessages from '../../../common/auth/authMessages';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { fields } from '../../../common/lib/redux-fields';
import { resetPassword } from '../../../common/auth/actions';
import { Form, Button, Input, Box } from '../../app/components';
import { focus } from '../../app/components-old';

class ResetPasswordFields extends React.Component {

  constructor(props: P, context: any) {
    super(props, context);

    this.state = {
      recoveryEmailSent: false,
      disabled: true,
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  onFormSubmit = () => {
    this.resetPassword();
  }

  resetPassword() {
    const { fields, resetPassword } = this.props;
    resetPassword(fields.$values());
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
            <Button onClick={this.resetPassword} primary width="100%" disabled={disabled} align="center">
              <FormattedMessage {...buttonsMessages.resetPassword} />
            </Button>
          </Box>
        </Box>
      </Form>
    );
  }
}


ResetPasswordFields.propTypes = {
  disabled: React.PropTypes.bool.isRequired,
  fields: React.PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  resetPassword: React.PropTypes.func.isRequired,
};

ResetPasswordFields = focus(ResetPasswordFields, 'error');

export default R.compose(
  connect(
    (state: State) => ({
      disabled: state.auth.formDisabled,
      error: state.auth.error,
    }),
    { resetPassword },
  ),
  injectIntl,
  fields({
    path: 'resetPassword',
    fields: ['email'],
  }),
)(ResetPasswordFields);
