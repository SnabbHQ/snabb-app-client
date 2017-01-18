/* @flow */
import type { State } from '../../../common/types';
import authMessages from '../../../common/auth/authMessages';
import React from 'react';
import ResetPasswordFields from './ResetPasswordFields';
import ResetPasswordSent from './ResetPasswordSent';
import R from 'ramda';
import FormError from '../FormError';
import linksMessages from '../../../common/app/linksMessages';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { Full, Title, Loading, Box, Text } from '../../app/components';

// $FlowFixMe
const logo = require('../../../common/app/images/logoBlack.svg');


const ResetPasswordField = ({ disabled, intl }) => (
  <Box>
    <Text
      align="center"
      display="block"
      size={2}
    >
      {intl.formatMessage(authMessages.resetPassword)}
    </Text>
    <ResetPasswordFields />
    <Text
      align="center"
      display="block"
    >
      {intl.formatMessage(authMessages.resetPasswordDescription)}
    </Text>
  </Box>
);

const ResetPasswordPage = ({ disabled, intl, authed, resetPasswordSent }) => (
  <Full>
    <Box width={20}>
      <Title message={linksMessages.resetPassword} />
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
        { resetPasswordSent ?
          <ResetPasswordSent />
          :
          <ResetPasswordField
            disabled={disabled}
            intl={intl}
          />
        }
      </Box>
    </Box>
  </Full>
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
