/* @flow */
import type {State} from '../../../common/types';
import R from 'ramda';
import React from 'react';
import buttonMessages from '../../../common/app/buttonsMessages';
import inputMessages from '../../../common/app/inputMessages';
import linksMessages from '../../../common/app/linksMessages';
import authMessages from '../../../common/auth/authMessages';
import {connect} from 'react-redux';
import { fields } from '../../../common/lib/redux-fields';
import {FormattedMessage, injectIntl} from 'react-intl';
import {FieldHeader, Button, focus, Form, Space, Input, Link, Box} from '../../app/components';
import {updatePassword} from '../../../common/user/actions';

const PasswordFields = ({error, fields, intl, profile, updatePassword}) => {

  const onFormSubmit = () => {
    sendUpdatePassword();
  };

  const sendUpdatePassword = () => {
    updatePassword(profile.profileId, fields.$values());
  };

  return (
    <Form onSubmit={onFormSubmit} >
      <Box>
        <FieldHeader titleSize={2} title={linksMessages.changePassword} />
        <Input
          error={error}
          field={fields.oldPassword}
          label={intl.formatMessage(inputMessages.currentPassword)}
          maxLength={100}
          type="password"
        />
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
        <Box display="flex" marginVertical={1} >
          <Link
            color="accent"
            size={0}
            to="/forgotPassword"
          >
            <FormattedMessage {...authMessages.passwordForgotten} />
          </Link>
          <Space auto />
          <Button accent paddingHorizontal={2} onClick={sendUpdatePassword}>
            <FormattedMessage {...buttonMessages.save} />
          </Button>
        </Box>
      </Box>
    </Form>
  );
};

export default R.compose(
  connect(
    (state: State) => ({
      profile: state.user.profile,
      error: state.auth.error,
    }),
    {updatePassword},
  ),
  injectIntl,
  fields({
    path: 'updatePassword',
    fields: ['oldPassword', 'newPassword', 'newPasswordConfirmation'],
  }),
  focus('error'),
)(PasswordFields);

