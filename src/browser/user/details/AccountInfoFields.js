/* @flow */
import type {State, Profile} from '../../../common/types';
import R from 'ramda';
import React from 'react';
import buttonMessages from '../../../common/app/buttonsMessages';
import inputMessages from '../../../common/app/inputMessages';
import linksMessages from '../../../common/app/linksMessages';
import {updateProfile} from '../../../common/user/actions';
import {connect} from 'react-redux';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {fields} from '../../../common/lib/redux-fields';
import {
  CenteredBox,
  FieldHeader,
  Loading,
  Form,
  Error,
  Button,
  Space,
  Input,
  focus,
  Box
} from '../../app/components';

class AccountInfoFields extends React.Component {

  constructor(props: P, context: any) {
    super(props, context);

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.updateUserProfile = this.updateUserProfile.bind(this);
  }

  componentWillUnmount() {
    const {fields} = this.props;
    fields.$reset();
  }

  onFormSubmit() {
    this.updateUserProfile();
  };

  updateUserProfile() {
    const {fields, profile, updateProfile} = this.props;
    updateProfile(profile.profileId, fields.$values());
  };

  render() {
    const {disabled, error, fields, intl, isFetching} = this.props;

    return (
      <Box>
        <FieldHeader title={linksMessages.account} />
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
        <CenteredBox>
          <Error
            error={error}
          />
          {isFetching &&
          <Loading marginVertical={1} />
          }
        </CenteredBox>
        <Box display="flex" marginVertical={1} >
          <Space auto />
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
  isFetching: React.PropTypes.bool.isRequired,
  profile: React.PropTypes.object.isRequired,
  updateProfile: React.PropTypes.func.isRequired
};

export default R.compose(
  connect(
    (state: State) => ({
      disabled: state.user.formDisabled,
      isFetching: state.user.isFetching,
      profile: state.user.profile,
      error: state.user.error,
    }),
    {updateProfile},
  ),
  injectIntl,
  fields({
    path: 'account/info',
    fields: ['companyName', 'email', 'phone'],
    getInitialState: (props) => ({
      // We can use props of course.
      companyName: props.profile.companyName,
      email: props.profile.email,
      phone: props.profile.phone
    }),
  }),
  focus('error'),
)(AccountInfoFields);

