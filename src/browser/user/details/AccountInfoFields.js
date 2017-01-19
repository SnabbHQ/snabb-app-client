/* @flow */
import type {State, Profile} from '../../../common/types';
import R from 'ramda';
import React from 'react';
import buttonMessages from '../../../common/app/buttonsMessages';
import inputMessages from '../../../common/app/inputMessages';
import linksMessages from '../../../common/app/linksMessages';
import {updateProfile} from '../../../common/user/profile/actions';
import {connect} from 'react-redux';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {fields} from '../../../common/lib/redux-fields';
import {FieldHeader, Form, Button, Space, Input, focus, Box} from '../../app/components';

class AccountInfoFields extends React.Component {

  constructor(props: P, context: any) {
    super(props, context);

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.updateUserProfile = this.updateUserProfile.bind(this);
  }

  componentWillMount() {
    const { profile, fields } = this.props;
    fields['companyName'].value = profile.companyName;
    fields['email'].value = profile.email;
    fields['phone'].value = profile.phone;
  }

  onFormSubmit() {
    this.updateUserProfile();
  };

  updateUserProfile() {
    const { fields, profile, updateProfile } = this.props;
    updateProfile(profile.profileId, fields.$values());
  };

  render() {

    const {disabled, error, fields, intl} = this.props;

    return (


      <Box>
        <FieldHeader titleSize={2} title={linksMessages.account} />
        <Form onSubmit={this.onFormSubmit} >
          <Input
            error={error}
            field={fields.companyName}
            label={intl.formatMessage(inputMessages.name)}
            maxLength={100}
            placeholder={intl.formatMessage(inputMessages.name)}
            type="text"
          />
          <Input
            error={error}
            field={fields.email}
            label={intl.formatMessage(inputMessages.email)}
            maxLength={100}
            placeholder={intl.formatMessage(inputMessages.emailPlaceholder)}
            type="text"
          />
          <Input
            error={error}
            field={fields.phone}
            label={intl.formatMessage(inputMessages.phone)}
            maxLength={100}
            placeholder={intl.formatMessage(inputMessages.phonePlaceholder)}
            type="text"
          />
        </Form>
        <Box display="flex" marginVertical={1} >
          <Space auto />
          <Space x={1} />
          <Button accent paddingHorizontal={2} onClick={this.updateUserProfile} disabled={disabled} >
            <FormattedMessage {...buttonMessages.save} />
          </Button>
        </Box>
      </Box>
    )
  }
}

AccountInfoFields.propTypes = {
  disabled: React.PropTypes.bool.isRequired,
  error: React.PropTypes.object,
  fields: React.PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  profile: React.PropTypes.object.isRequired,
  updateProfile: React.PropTypes.func.isRequired
};

export default R.compose(
  connect(
    (state: State) => ({
      disabled: state.user.formDisabled,
      profile: state.user.profile,
      error: state.user.error,
    }),
    {updateProfile},
  ),
  injectIntl,
  fields({
    path: 'account',
    fields: ['companyName', 'email', 'phone'],
  }),
  focus('error'),
)(AccountInfoFields);

