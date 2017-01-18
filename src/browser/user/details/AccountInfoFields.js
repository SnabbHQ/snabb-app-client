/* @flow */
import type {State, Profile} from '../../../common/types';
import R from 'ramda';
import React from 'react';
import buttonMessages from '../../../common/app/buttonsMessages';
import inputMessages from '../../../common/app/inputMessages';
import linksMessages from '../../../common/app/linksMessages';
import { updateProfile } from '../../../common/user/profile/actions';
import {connect} from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { fields } from '../../../common/lib/redux-fields';
import { FieldHeader, Form, Button, Space, Input, focus, Box } from '../../app/components';

type AccountInfoFieldsProps = {
  profile: Profile
}

const AccountInfoFields = ({ disabled, error, fields, intl, profile, updateProfile }: AccountInfoFieldsProps) => {

  const onFormSubmit = () => {
    updateUserProfile();
  };

  const updateUserProfile = () => {
    updateProfile(profile.profileId, fields.$values());
  };

  return (
    <Box>
      <FieldHeader titleSize={2} title={linksMessages.account} />
      <Form onSubmit={onFormSubmit}>
        <Input
          error={error}
          field={fields.companyName}
          label={intl.formatMessage(inputMessages.name)}
          maxLength={100}
          placeholder={intl.formatMessage(inputMessages.name)}
          defaultValue={profile.companyName}
          type="text"
        />
        <Input
          error={error}
          field={fields.email}
          label={intl.formatMessage(inputMessages.email)}
          maxLength={100}
          placeholder={intl.formatMessage(inputMessages.emailPlaceholder)}
          defaultValue={profile.email}
          type="text"
        />
        <Input
          error={error}
          field={fields.phone}
          label={intl.formatMessage(inputMessages.phone)}
          maxLength={100}
          placeholder={intl.formatMessage(inputMessages.phonePlaceholder)}
          defaultValue={profile.phone}
          type="text"
        />
      </Form>
      <Box display="flex" marginVertical={1} >
        <Space auto />
        <Space x={1} />
        <Button accent paddingHorizontal={2} onClick={updateUserProfile} disabled={disabled}>
          <FormattedMessage {...buttonMessages.save} />
        </Button>
      </Box>
    </Box>
  );
};

export default R.compose(
  connect(
    (state: State) => ({
      disabled: state.user.formDisabled,
      profile: state.user.profile,
      error: state.user.error,
    }),
    { updateProfile },
  ),
  injectIntl,
  fields({
    path: 'login',
    fields: ['companyName', 'email', 'phone'],
  }),
  focus('error'),
)(AccountInfoFields);

