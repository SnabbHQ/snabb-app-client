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
  PageHeader,
  Title,
  Box,
} from '../app/components';
import {
  Loading,
  Message,
} from '../app/components-old';

const SignInPage = ({ disabled, intl, location, authed }) => (
  authed ?
    <Redirect
      to={(
        location.state &&
        location.state.from &&
        location.state.from.pathname
      ) || '/'}
    />
  :
    <Box>
      <Title message={linksMessages.signIn} />
      <PageHeader heading={intl.formatMessage(linksMessages.signIn)} />

      <Block>
        <Email />
      </Block>
      <SignInError />
      {disabled &&
        <Loading>
          {message => <Message>{message}</Message>}
        </Loading>
      }
    </Box>
);

SignInPage.propTypes = {
  disabled: React.PropTypes.bool.isRequired,
  intl: intlShape,
  location: React.PropTypes.object.isRequired,
  authed: React.PropTypes.object,
};

export default R.compose(
  connect(
    (state: State) => ({
      disabled: state.auth.form.disabled,
      authed: state.user.profile.email,
    }),
  ),
  injectIntl,
)(SignInPage);
