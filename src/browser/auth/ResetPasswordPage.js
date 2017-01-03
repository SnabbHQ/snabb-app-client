/* @flow */
import type { State } from '../../common/types';
import ResetPasswordFields from './ResetPasswordFields';
import R from 'ramda';
import React from 'react';
import SignInError from './SignInError';
import linksMessages from '../../common/app/linksMessages';
import authMessages from '../../common/auth/authMessages';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { Block, Image, Title, Loading, Box, Fixed, Text } from '../app/components';
import { Message } from '../app/components-old';

// $FlowFixMe
const logo = require('../../../assets/images/logoBlack.svg');

const ResetPasswordPage = ({ disabled, intl, authed }) => (
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
    <Box display="flex" height="80%" alignItems="center" justifyContent="center">
      <Box width="350px">
        <Title message={linksMessages.resetPassword} />
        <Block>
          <Box marginBottom={1}>
            <Image
              alt="Snabb logo"
              height={100}
              width="100%"
              src={logo}
            />
          </Box>
          <Text
            align="center"
            display="block"
            size={2}
          >
            {intl.formatMessage(authMessages.resetPassword)}
          </Text>
          <Text
            align="center"
            display="block"
          >
            {intl.formatMessage(authMessages.resetPasswordDescription)}
          </Text>
          <ResetPasswordFields />
        </Block>
        <SignInError />
        { disabled &&
        <Loading>
          {message => <Message>{message}</Message>}
        </Loading>
        }
      </Box>
    </Box>
  </Fixed>
);

ResetPasswordPage.propTypes = {
  disabled: React.PropTypes.bool.isRequired,
  intl: intlShape,
  location: React.PropTypes.object.isRequired,
};

export default R.compose(
  connect(
    (state: State) => ({
      disabled: state.auth.formDisabled,
      authed: state.user.profile,
    }),
  ),
  injectIntl,
)(ResetPasswordPage);
