/* @flow */
import React from 'react';
import type { State } from '../../common/types';
import LoginFields from './LoginFields';
import R from 'ramda';
import FormError from './FormError';
import linksMessages from '../../common/app/linksMessages';
import authMessages from '../../common/auth/authMessages';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {
  Box,
  Block,
  Button,
  Divider,
  Link,
  Loading,
  Message,
  Text,
  Title,
} from '../app/components';
import { resetAuthState } from '../../common/auth/actions';

// $FlowFixMe
const logo = require('../../common/app/images/logoBlack.svg');

const LogInPage = ({ disabled, location, authed, resetAuthState }, { router }: Object) => {
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
            <Box display="flex" justifyContent="flex-end">
              <Button
                onClick={forgotPassword}
                marginTop={1}
                backgroundColor="white"
                color="primary"
                align="right"
                size={-1}
              >
                <FormattedMessage {...authMessages.passwordForgotten} />
              </Button>
            </Box>
            <Divider marginVertical={1} />
            <Button
              onClick={register}
              marginTop={1}
              display="block"
              backgroundColor="white"
              color="primary"
              align="center"
            >
              <FormattedMessage {...authMessages.createAccount} />
            </Button>
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
