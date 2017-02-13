/* @flow */
import React from 'react';
import type { State } from '../../common/types';
import LoginFields from './LoginFields';
import R from 'ramda';
import linksMessages from '../../common/app/linksMessages';
import userMessages from '../../common/user/userMessages';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {
  Box,
  Block,
  CenteredBox,
  Full,
  Link,
  Text,
  Title,
} from '../app/components';
import { resetUserState } from '../../common/user/actions';

// $FlowFixMe
const logo = require('../../common/app/images/logoBlack.svg');

const LogInPage = ({ location, authed, resetUserState }) => {
  const forgotPassword = () => {
    resetUserState();
  };

  const register = () => {
    resetUserState();
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
      <Full>
        <Box width={20}>
          <Title message={linksMessages.logIn} />
          <Box display="flex" flexDirection="column" padding={1}>
            <Text
              align="center"
              display="block"
              size={4}
              marginBottom={1}
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
                size={0}
                to="/forgotPassword"
              >
                <FormattedMessage {...userMessages.passwordForgotten} />
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
                <FormattedMessage {...userMessages.createAccount} />
              </Link>
            </CenteredBox>
          </Box>
        </Box>
      </Full>
  );
};

LogInPage.propTypes = {
  disabled: React.PropTypes.bool.isRequired,
  location: React.PropTypes.object.isRequired,
  authed: React.PropTypes.object,
  resetUserState: React.PropTypes.func.isRequired,
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
    { resetUserState },
  ),
)(LogInPage);
