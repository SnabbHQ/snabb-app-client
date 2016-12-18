/* @flow */
import type { State } from '../../common/types';
import Email from './Email';
import R from 'ramda';
import React from 'react';
import SignInError from './SignInError';
import linksMessages from '../../common/app/linksMessages';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import {
  Block,
  Loading,
  Message,
  PageHeader,
  Title,
  View,
} from '../app/components-old';

const SignInPage = ({ disabled, intl, location, viewer }) => (
  viewer ?
    <Redirect
      to={(
        location.state &&
        location.state.from &&
        location.state.from.pathname
      ) || '/'}
    />
  :
    <View>
      <Title message={linksMessages.signIn} />
      <PageHeader heading={intl.formatMessage(linksMessages.signIn)} />

      <SignInError />
      {disabled &&
        <Loading>
          {message => <Message>{message}</Message>}
        </Loading>
      }
    </View>
);

//<Block>
//  <Email />
//</Block>

SignInPage.propTypes = {
  disabled: React.PropTypes.bool.isRequired,
  intl: intlShape,
  location: React.PropTypes.object.isRequired,
  viewer: React.PropTypes.object,
};

export default R.compose(
  connect(
    (state: State) => ({
      disabled: state.auth.formDisabled,
      viewer: undefined, //state.users.viewer,
    }),
  ),
  injectIntl,
)(SignInPage);
