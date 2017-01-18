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

const AccountInfoFields = ({ fields, intl, profile, updateProfile }: AccountInfoFieldsProps) => {

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
          name="Business Name"
          label={intl.formatMessage(inputMessages.name)}
          maxLength={100}
          placeholder={intl.formatMessage(inputMessages.name)}
          value={profile.companyName}
          type="text"
        />
        <Input
          name="Email"
          label={intl.formatMessage(inputMessages.email)}
          maxLength={100}
          placeholder={intl.formatMessage(inputMessages.emailPlaceholder)}
          value={profile.email}
          type="text"
        />
        <Input
          name="Phone"
          label={intl.formatMessage(inputMessages.phone)}
          maxLength={100}
          placeholder={intl.formatMessage(inputMessages.phonePlaceholder)}
          value={profile.phone}
          type="text"
        />
      </Form>
      <Box display="flex" marginVertical={1} >
        <Space auto />
        <Button gray paddingHorizontal={2} >
          <FormattedMessage {...buttonMessages.cancel} />
        </Button>
        <Space x={1} />
        <Button accent paddingHorizontal={2} >
          <FormattedMessage {...buttonMessages.save} />
        </Button>
      </Box>
    </Box>
  );
};

export default R.compose(
  connect(
    (state: State) => ({
      profile: state.user.profile,
    }),
    { updateProfile },
  ),
  injectIntl,
  fields({
    path: 'login',
    fields: ['email', 'password'],
  }),
  focus('error'),
)(AccountInfoFields);

