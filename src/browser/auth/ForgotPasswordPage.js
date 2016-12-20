/* @flow */
import type { State } from '../../common/types';
import Email from './LoginFields';
import R from 'ramda';
import React from 'react';
import SignInError from './SignInError';
import linksMessages from '../../common/app/linksMessages';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { Block, Image, Title, Loading, Box, Fixed } from '../app/components';
import { Message } from '../app/components-old';

// $FlowFixMe
const logo = require('../../../assets/images/logoBlack.svg');

const ForgotPasswordPage = ({ disabled, location, authed }) => (
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
        <Title message={linksMessages.signIn} />
        <Block>
          <Box marginBottom={1}>
            <Image
              alt="Snabb logo"
              height={100}
              width={100}
              src={logo}
            />
          </Box>

          <Email />
        </Block>
        <SignInError />
        { disabled &&
        <Loading>
          {message => <Message>{message}</Message>}
        </Loading>
        }
      </Box>
    </Fixed>
);

ForgotPasswordPage.propTypes = {
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
)(ForgotPasswordPage);
