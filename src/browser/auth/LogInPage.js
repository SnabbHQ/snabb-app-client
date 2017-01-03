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
import { Block, Divider, Image, Button, Link, Title, Loading, Box, Fixed } from '../app/components';
import { resetAuthState } from '../../common/auth/actions';
import { Message } from '../app/components-old';

// $FlowFixMe
const logo = require('../../../assets/images/logoBlack.svg');

const LogInPage = ({ disabled, location, authed, resetAuthState }, { router }: Object) => {
  const forgotPassword = () => {
    resetAuthState();
    router.transitionTo('/resetPassword');
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
      <Fixed top bottom left right>
        <Box display="flex" height="100%" alignItems="center" justifyContent="center">
          <Box width="350px">
            <Title message={linksMessages.logIn} />
            <Block>
              <Box marginBottom={1} alignItems="center" justifyContent="center">
                <Image
                  alt="Snabb logo"
                  height={100}
                  width="100%"
                  src={logo}
                />
              </Box>
              <FormError />
              { disabled &&
              <Loading>
                {message => <Message>{message}</Message>}
              </Loading>
              }
              <LoginFields />
              <Box display="flex" justifyContent="flex-end">
                <Button
                  onClick={forgotPassword}
                  marginTop="1em"
                  display="block"
                  antialiasing
                  backgroundColor="white"
                  color="primary"
                  to="/resetPassword"
                  align="end"
                  size={-1}
                >
                  <FormattedMessage {...authMessages.passwordForgotten} />
                </Button>
              </Box>
              <Divider marginVertical="0.3em" />
              <Link
                display="block"
                bold
                antialiasing
                color="accent"
                to="/register"
                align="center"
              >
                <FormattedMessage {...authMessages.createAccount} />
              </Link>
            </Block>
          </Box>
        </Box>
      </Fixed>
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
