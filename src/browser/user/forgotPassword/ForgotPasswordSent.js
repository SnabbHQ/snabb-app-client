/* @flow */
import React, { PropTypes } from 'react';
import type { State } from '../../../common/types';
import R from 'ramda';
import buttonsMessages from '../../../common/app/buttonsMessages';
import userMessages from '../../../common/user/userMessages';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link, CenteredBox, Title, Box, Text } from '../../app/components';
import { resetUserState } from '../../../common/user/actions';

const ForgotPasswordSent = ({ intl, resetUserState }) => {

  const backToLogin = () => {
    resetUserState();
  };

  return (
    <Box>
      <Title message={userMessages.forgotPasswordSent} />
      <Text
        bold
        align="center"
        display="block"
        size={2}
      >
        {intl.formatMessage(userMessages.forgotPassword)}
      </Text>
      <Text
        align="center"
        display="block"
      >
        {intl.formatMessage(userMessages.forgotPasswordSentDesc)}
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
      error: state.user.error,
    }),
    { resetUserState },
  ),
  injectIntl,
)(ForgotPasswordSent);
