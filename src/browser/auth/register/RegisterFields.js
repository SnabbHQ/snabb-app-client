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
import { CenteredBox, Form, focus, Button, Input, Loading, Box } from '../../app/components';
import FormError from '../FormError';

class RegisterFields extends React.Component {

  onFormSubmit = () => {
    this.register();
  };

  register = () => {
    const { fields, register } = this.props;
    register('password', fields.$values());
  }

  render() {
    const { disabled, error, fields, intl } = this.props;

    return (
      <Form onSubmit={this.onFormSubmit}>
        <Box>
          <Input
            field={fields.name}
            disabled={disabled}
            error={error}
            placeholder={intl.formatMessage(authMessages.businessName)}
            maxLength={1000}
          />
          <Input
            field={fields.phone}
            disabled={disabled}
            error={error}
            placeholder={intl.formatMessage(authMessages.phone)}
            maxLength={1000}
          />
          <Input
            field={fields.email}
            disabled={disabled}
            error={error}
            placeholder={intl.formatMessage(authMessages.email)}
            maxLength={100}
            type="email"
          />
          <Input
            field={fields.password}
            disabled={disabled}
            error={error}
            maxLength={1000}
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
            <Button width={20} size={1} accent onClick={this.register} disabled={disabled} align="center">
              <FormattedMessage {...buttonsMessages.register} />
            </Button>
          </CenteredBox>
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
    path: ['register', 'auth'],
    fields: ['name', 'phone', 'email', 'password'],
  }),
  focus('error'),
)(RegisterFields);
