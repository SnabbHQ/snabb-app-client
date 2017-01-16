/* @flow */
import React from 'react';
import type { State } from '../../common/types';
import LoginFields from './LoginFields';
import R from 'ramda';
import linksMessages from '../../common/app/linksMessages';
import authMessages from '../../common/auth/authMessages';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {
  Box,
  Block,
  CenteredBox,
  Link,
  Text,
  Title,
} from '../app/components';
import { resetAuthState } from '../../common/auth/actions';

// $FlowFixMe
const logo = require('../../common/app/images/logoBlack.svg');

const LogInPage = ({ location, authed, resetAuthState }, { router }: Object) => {
  const forgotPassword = () => {
    resetAuthState();
    router.transitionTo('/resetPassword');
  };

  const register = () => {
    resetAuthState();
    router.transitionTo('/register');
  };

  return (
    authed ?
      <Redirect
        to={(
        location.state &&
        location.state.from &&
        location.state.from.pathname
      ) || '/'}
      />
      :
      <Box
        padding={1}
        display="flex"
        flexDirection="row"
        marginTop={3}
        justifyContent="center"
      >
        <Box width={20}>
          <Title message={linksMessages.logIn} />
          <Block>
            <Text
              align="center"
              display="block"
              size={2}
              marginBottom={0.5}
              bold
            >
              Snabb
            </Text>
            <LoginFields />
            <CenteredBox>
              <Link
                onClick={forgotPassword}
                backgroundColor="white"
                color="accent"
                size={1}
                to="/resetPassword"
              >
                <FormattedMessage {...authMessages.passwordForgotten} />
              </Link>
            </CenteredBox>
            <CenteredBox>
              <Link
                onClick={register}
                display="block"
                backgroundColor="white"
                color="accent"
                size={1}
                marginTop={1}
                to="/register"
              >
                <FormattedMessage {...authMessages.createAccount} />
              </Link>
            </CenteredBox>
          </Block>
        </Box>
      </Box>
  );
};

LogInPage.propTypes = {
  disabled: React.PropTypes.bool.isRequired,
  location: React.PropTypes.object.isRequired,
  authed: React.PropTypes.object,
  resetAuthState: React.PropTypes.func.isRequired,
};

LogInPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default R.compose(
  connect(
    (state: State) => ({
      disabled: state.auth.formDisabled,
      authed: state.user.profile,
    }),
    { resetAuthState },
  ),
)(LogInPage);
