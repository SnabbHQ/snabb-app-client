/* @flow */
import type { State } from '../../../common/types';
import userMessages from '../../../common/user/userMessages';
import React from 'react';
import ForgotPasswordFields from './ForgotPasswordFields';
import ForgotPasswordSent from './ForgotPasswordSent';
import R from 'ramda';
import linksMessages from '../../../common/app/linksMessages';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { Full, Title, Box, Text } from '../../app/components';

const ForgotPasswordField = ({ disabled, intl }) => (
  <Box>
    <Text
      align="center"
      display="block"
      size={2}
    >
      {intl.formatMessage(userMessages.forgotPassword)}
    </Text>
    <ForgotPasswordFields />
    <Text
      align="center"
      display="block"
    >
      {intl.formatMessage(userMessages.forgotPasswordDescription)}
    </Text>
  </Box>
);

const ForgotPasswordPage = ({ disabled, intl, authed, forgotPasswordSent }) => (
  <Full>
    <Box width={20}>
      <Title message={linksMessages.forgotPassword} />
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
        { forgotPasswordSent ?
          <ForgotPasswordSent />
          :
          <ForgotPasswordField
            disabled={disabled}
            intl={intl}
          />
        }
      </Box>
    </Box>
  </Full>
);

ForgotPasswordPage.propTypes = {
  disabled: React.PropTypes.bool.isRequired,
  intl: intlShape,
  location: React.PropTypes.object.isRequired,
};

export default R.compose(
  connect(
    (state: State) => ({
      disabled: state.auth.formDisabled,
      authed: state.user.profile,
      forgotPasswordSent: state.user.forgotPasswordSent,
    }),
  ),
  injectIntl,
)(ForgotPasswordPage);
