/* @flow */
import type {State} from '../../../common/types';
import R from 'ramda';
import React from 'react';
import buttonMessages from '../../../common/app/buttonsMessages';
import inputMessages from '../../../common/app/inputMessages';
import linksMessages from '../../../common/app/linksMessages';
import {connect} from 'react-redux';
import {fields} from '../../../common/lib/redux-fields';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {
  CenteredBox,
  Error,
  Button,
  focus,
  Form,
  Loading,
  Space,
  Text,
  Input,
  Box
} from '../../app/components';
import {resetPassword} from '../../../common/user/actions';

const ResetPasswordFields = ({disabled, error, fields, hash, intl, resetPassword}) => {

  const onFormSubmit = () => {
    sendResetPassword();
  };

  const sendResetPassword = () => {
    resetPassword(hash, fields.$values());
  };

  return (
    <Form onSubmit={onFormSubmit} >
      <Box>
        <Text
          align="center"
          display="block"
          size={2}
        >
          {intl.formatMessage(linksMessages.resetPassword)}
        </Text>
        <Input
          error={error}
          field={fields.newPassword}
          label={intl.formatMessage(inputMessages.newPassword)}
          maxLength={100}
          type="password"
        />
        <Input
          error={error}
          field={fields.newPasswordConfirmation}
          label={intl.formatMessage(inputMessages.confirmNewPassword)}
          maxLength={100}
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
        <Box display="flex" marginVertical={1} >
          <Space auto />
          <Button accent paddingHorizontal={2} onClick={sendResetPassword} >
            <FormattedMessage {...buttonMessages.save} />
          </Button>
        </Box>
      </Box>
    </Form>
  );
};

ResetPasswordFields.propTypes = {
  disabled: React.PropTypes.bool.isRequired,
  error: React.PropTypes.object,
  fields: React.PropTypes.object.isRequired,
  hash: React.PropTypes.string,
  intl: intlShape.isRequired,
  resetPassword: React.PropTypes.func.isRequired,
};

export default R.compose(
  connect(
    (state: State) => ({
      disabled: state.user.formDisabled,
      error: state.user.error,
      resetPasswordSuccess: state.user.resetPasswordSuccess
    }),
    {resetPassword},
  ),
  injectIntl,
  fields({
    path: 'resetPassword',
    fields: ['newPassword', 'newPasswordConfirmation'],
  }),
  focus('error'),
)(ResetPasswordFields);

