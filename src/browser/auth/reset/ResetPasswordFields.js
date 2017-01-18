/* @flow */
import R from 'ramda';
import type {State} from '../../../common/types';
import React from 'react';
import buttonsMessages from '../../../common/app/buttonsMessages';
import inputMessages from '../../../common/app/inputMessages';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {connect} from 'react-redux';
import {fields} from '../../../common/lib/redux-fields';
import {resetPassword} from '../../../common/auth/actions';
import {Form, CenteredBox, focus, Button, Input, Box} from '../../app/components';
import FormError from '../FormError';

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
  };

  resetPassword() {
    const { fields, resetPassword } = this.props;
    resetPassword(fields.$values());
    this.setState({
      disabled: false,
      recoveryEmailSent: true,
    });
  }

  render() {
    const {disabled, fields, intl, error } = this.props;

    return (
      <Form onSubmit={this.onFormSubmit} small >
        <Box>
          <Input
            field={fields.email}
            disabled={disabled}
            error={error}
            maxLength={100}
            placeholder={intl.formatMessage(inputMessages.emailPlaceholder)}
          />
          <CenteredBox>
            <FormError />
            {disabled &&
            <Loading marginVertical={1} />
            }
          </CenteredBox>
          <CenteredBox>
            <Button width={20} size={1} accent onClick={this.resetPassword} disabled={disabled} align="center" >
              <FormattedMessage {...buttonsMessages.resetPassword} />
            </Button>
          </CenteredBox>
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

export default R.compose(
  connect(
    (state: State) => ({
      disabled: state.auth.formDisabled,
      error: state.auth.error,
    }),
    {resetPassword},
  ),
  injectIntl,
  fields({
    path: 'resetPassword',
    fields: ['email'],
  }),
  focus('error'),
)(ResetPasswordFields);
