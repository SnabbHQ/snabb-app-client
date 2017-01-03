/* @flow */
import React, { PropTypes } from 'react';
import type { State } from '../../../common/types';
import R from 'ramda';
import buttonsMessages from '../../../common/app/buttonsMessages';
import authMessages from '../../../common/auth/authMessages';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Button, Title, Box, Text } from '../../app/components';
import { resetAuthState } from '../../../common/auth/actions';

const ResetPasswordSent = ({ intl, resetAuthState }, { router }: Object) => {
  const backToLogin = () => {
    resetAuthState();
    router.transitionTo('/login');
  };

  return (
    <Box>
      <Title message={authMessages.resetPasswordSent} />
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
        {intl.formatMessage(authMessages.resetPasswordSentDesc)}
      </Text>
      <Button marginVertical="1em" width="100%" align="center" onClick={backToLogin}>
        <FormattedMessage {...buttonsMessages.returnToLogIn} />
      </Button>
    </Box>
  );
};

ResetPasswordSent.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default R.compose(
  connect(
    (state: State) => ({
      error: state.auth.error,
    }),
    { resetAuthState },
  ),
  injectIntl,
)(ResetPasswordSent);
