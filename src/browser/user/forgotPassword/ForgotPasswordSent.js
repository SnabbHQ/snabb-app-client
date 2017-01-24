/* @flow */
import React, { PropTypes } from 'react';
import type { State } from '../../../common/types';
import R from 'ramda';
import buttonsMessages from '../../../common/app/buttonsMessages';
import authMessages from '../../../common/auth/authMessages';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link, CenteredBox, Title, Box, Text } from '../../app/components';
import { resetAuthState } from '../../../common/auth/actions';

const ForgotPasswordSent = ({ intl, resetAuthState }) => {

  const backToLogin = () => {
    resetAuthState();
  };

  return (
    <Box>
      <Title message={authMessages.forgotPasswordSent} />
      <Text
        bold
        align="center"
        display="block"
        size={2}
      >
        {intl.formatMessage(authMessages.forgotPassword)}
      </Text>
      <Text
        align="center"
        display="block"
      >
        {intl.formatMessage(authMessages.forgotPasswordSentDesc)}
      </Text>
      <CenteredBox>
        <Link
          onClick={backToLogin}
          display="block"
          backgroundColor="white"
          color="accent"
          size={1}
          marginTop={1}
          to="/login"
        >
          <FormattedMessage {...buttonsMessages.returnToLogIn} />
        </Link>
      </CenteredBox>
    </Box>
  );
};

export default R.compose(
  connect(
    (state: State) => ({
      error: state.auth.error,
    }),
    { resetAuthState },
  ),
  injectIntl,
)(ForgotPasswordSent);
