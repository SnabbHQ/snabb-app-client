/* @flow */
import R from 'ramda';
import type {State} from '../../../common/types';
import React from 'react';
import buttonsMessages from '../../../common/app/buttonsMessages';
import inputMessages from '../../../common/app/inputMessages';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {connect} from 'react-redux';
import {fields} from '../../../common/lib/redux-fields';
import {forgotPassword} from '../../../common/user/actions';
import {Form, Loading, CenteredBox, focus, Button, Error, Input, Box} from '../../app/components';

class ForgotPasswordFields extends React.Component {

  constructor(props: P, context: any) {
    super(props, context);

    this.state = {
      recoveryEmailSent: false,
      disabled: true,
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
  }

  onFormSubmit = () => {
    this.forgotPassword();
  };

  forgotPassword() {
    const { fields, forgotPassword } = this.props;
    forgotPassword(fields.$values());
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
            <Error
              error={error}
            />
            {disabled &&
            <Loading marginVertical={1} />
            }
          </CenteredBox>
          <CenteredBox>
            <Button width={20} size={1} accent onClick={this.forgotPassword} disabled={disabled} align="center" >
              <FormattedMessage {...buttonsMessages.forgotPassword} />
            </Button>
          </CenteredBox>
        </Box>
      </Form>
    );
  }
}


ForgotPasswordFields.propTypes = {
  disabled: React.PropTypes.bool.isRequired,
  fields: React.PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  forgotPassword: React.PropTypes.func.isRequired,
};

export default R.compose(
  connect(
    (state: State) => ({
      disabled: state.auth.formDisabled,
      error: state.auth.error,
    }),
    {forgotPassword},
  ),
  injectIntl,
  fields({
    path: 'forgotPassword',
    fields: ['email'],
  }),
  focus('error'),
)(ForgotPasswordFields);
