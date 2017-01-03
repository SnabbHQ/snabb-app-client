/* @flow */
import React from 'react';
import type { State } from '../../../common/types';
import ResetPasswordFields from './ResetPasswordFields';
import ResetPasswordSent from './ResetPasswordSent';
import R from 'ramda';
import FormError from '../FormError';
import linksMessages from '../../../common/app/linksMessages';
import authMessages from '../../../common/auth/authMessages';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { Block, Image, Title, Loading, Box, Fixed, Text } from '../../app/components';
import { Message } from '../../app/components-old';

// $FlowFixMe
const logo = require('../../../../assets/images/logoBlack.svg');


const ResetPasswordField = (props) => (
  <Box>
    <FormError />
    { props.disabled &&
    <Loading>
      {message => <Message>{message}</Message>}
    </Loading>
    }
    <Text
      align="center"
      display="block"
      size={2}
    >
      {props.intl.formatMessage(authMessages.resetPassword)}
    </Text>
    <Text
      align="center"
      display="block"
    >
      {props.intl.formatMessage(authMessages.resetPasswordDescription)}
    </Text>
    <ResetPasswordFields />
  </Box>
);

const ResetPasswordPage = ({ disabled, intl, authed, resetPasswordSent }) => (
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
            { resetPasswordSent ?
              <ResetPasswordSent />
              :
              <ResetPasswordField
                disabled={disabled}
                intl={intl}
              />
            }
          </Block>
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
      resetPasswordSent: state.auth.resetPasswordSent,
    }),
  ),
  injectIntl,
)(ResetPasswordPage);
