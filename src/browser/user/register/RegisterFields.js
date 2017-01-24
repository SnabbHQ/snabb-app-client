/* @flow */
import R from 'ramda';
import type { State } from '../../../common/types';
import React from 'react';
import buttonsMessages from '../../../common/app/buttonsMessages';
import inputMessages from '../../../common/app/inputMessages';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { fields } from '../../../common/lib/redux-fields';
import { register } from '../../../common/user/actions';
import { CenteredBox, Form, focus, Button, Input, Error, Loading, Box } from '../../app/components';

class RegisterFields extends React.Component {

  onFormSubmit = () => {
    this.register();
  };

  register = () => {
    const { fields, register } = this.props;
    register('password', fields.$values());
  };

  render() {
    const { disabled, error, fields, intl } = this.props;

    return (
      <Form onSubmit={this.onFormSubmit}>
        <Box>
          <Input
            field={fields.companyName}
            disabled={disabled}
            error={error}
            placeholder={intl.formatMessage(inputMessages.namePlaceholder)}
            maxLength={1000}
          />
          <Input
            field={fields.phone}
            disabled={disabled}
            error={error}
            placeholder={intl.formatMessage(inputMessages.phonePlaceholder)}
            maxLength={1000}
          />
          <Input
            field={fields.email}
            disabled={disabled}
            error={error}
            placeholder={intl.formatMessage(inputMessages.emailPlaceholder)}
            maxLength={100}
            type="email"
          />
          <Input
            field={fields.password}
            disabled={disabled}
            error={error}
            maxLength={1000}
            placeholder={intl.formatMessage(inputMessages.passwordPlaceholder)}
            type="password"
          />
          <CenteredBox>
            <Error
              error={error}
            />
            {disabled &&
            <Loading marginVertical={1} />
            }
          </CenteredBox>
          <CenteredBox>
            <Button
              accent
              width={20}
              size={1}
              onClick={this.register}
              disabled={disabled}
              align="center"
              transform="none">
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
    path: ['register'],
    fields: ['companyName', 'phone', 'email', 'password'],
  }),
  focus('error'),
)(RegisterFields);
