/* @flow */
import R from 'ramda';
import type { State } from '../../../common/types';
import React from 'react';
import buttonsMessages from '../../../common/app/buttonsMessages';
import authMessages from '../../../common/auth/authMessages';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { fields } from '../../../common/lib/redux-fields';
import { register } from '../../../common/auth/actions';
import { Form, focus , Button, Input, Loading, Box } from '../../app/components';
import FormError from '../FormError';
import { Message } from '../../app/components-old';

class RegisterFields extends React.Component {

  onFormSubmit = () => {
    this.register();
  };

  register = () => {
    const { fields, register } = this.props;
    register('password', fields.$values());
  }

  render() {
    const { disabled, fields, intl } = this.props;

    return (
      <Form onSubmit={this.onFormSubmit}>
        <Box>
          <Input
            {...fields.name}
            disabled={disabled}
            label={`${intl.formatMessage(authMessages.businessName)} *`}
            labelSize={-1}
            maxLength={1000}
            padding="0.5em"
          />
          <Input
            {...fields.email}
            disabled={disabled}
            label={`${intl.formatMessage(authMessages.businessEmail)} *`}
            labelSize={-1}
            maxLength={100}
            padding="0.5em"
            type="email"
          />
          <Input
            {...fields.phone}
            disabled={disabled}
            label={`${intl.formatMessage(authMessages.phone)} *`}
            labelSize={-1}
            maxLength={1000}
            padding="0.5em"
          />
          <Input
            {...fields.password}
            disabled={disabled}
            label={`${intl.formatMessage(authMessages.passwordLabel)} *`}
            labelSize={-1}
            maxLength={1000}
            padding="0.5em"
            placeholder={intl.formatMessage(authMessages.passwordPlaceholder)}
            type="password"
          />
          <FormError />
          { disabled &&
          <Loading>
            {message => <Text danger>{message}</Text>}
          </Loading>
          }
          <Box marginTop="1em">
            <Button primary onClick={this.register} width="100%" disabled={disabled} align="center">
              <FormattedMessage {...buttonsMessages.register} />
            </Button>
          </Box>
        </Box>
      </Form>
    );
  }
}

RegisterFields.propTypes = {
  disabled: React.PropTypes.bool.isRequired,
  fields: React.PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  register: React.PropTypes.func.isRequired,
};

export default R.compose(
  connect(
    (state: State) => ({
      disabled: state.auth.formDisabled,
      error: state.auth.error,
    }),
    { register },
  ),
  injectIntl,
  fields({
    path: ['register'],
    fields: ['name', 'email', 'phone', 'password'],
  }),
  focus('error'),
)(RegisterFields);