/* @flow */
import type { State } from '../../common/types';
import LoginFields from './LoginFields';
import R from 'ramda';
import React from 'react';
import SignInError from './SignInError';
import linksMessages from '../../common/app/linksMessages';
import authMessages from '../../common/auth/authMessages';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Block, Divider, Image, Link, Title, Loading, Box, Fixed } from '../app/components';
import { Message } from '../app/components-old';

// $FlowFixMe
const logo = require('../../../assets/images/logoBlack.svg');

const LogInPage = ({ disabled, location, authed }) => (
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
            <Box marginBottom={1}>
              <Image
                alt="Snabb logo"
                height={100}
                width={100}
                src={logo}
              />
            </Box>
            <SignInError />
            { !disabled &&
            <Loading>
              {message => <Message>{message}</Message>}
            </Loading>
            }
            <LoginFields />
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


LogInPage.propTypes = {
  disabled: React.PropTypes.bool.isRequired,
  location: React.PropTypes.object.isRequired,
  authed: React.PropTypes.object,
};

export default R.compose(
  connect(
    (state: State) => ({
      disabled: state.auth.formDisabled,
      authed: state.user,
    }),
  ),
)(LogInPage);
