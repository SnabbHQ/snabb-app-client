/* @flow */
import type { State } from '../../../common/types';
import authMessages from '../../../common/auth/authMessages';
import buttonsMessages from '../../../common/app/buttonsMessages';
import React from 'react';
import R from 'ramda';
import linksMessages from '../../../common/app/linksMessages';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { CenteredBox, Link, Full, Title, Loading, Box, Text } from '../../app/components';

// $FlowFixMe
const logo = require('../../../common/app/images/logoBlack.svg');


const VerifyUserPageSuccess = ({ intl }) => (
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
        //onClick={backToLogin}
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

const VerifyUserPage = ({ disabled, intl, authed, verified }) => (
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
        { verified ?
          <VerifyUserPageSuccess
            disabled={disabled}
            intl={intl}
          />
          :
          <VerifyUserPageSuccess
            disabled={disabled}
            intl={intl}
          />
        }
      </Box>
    </Box>
  </Full>
);

VerifyUserPage.propTypes = {
  disabled: React.PropTypes.bool.isRequired,
  intl: intlShape,
  location: React.PropTypes.object.isRequired,
};

export default R.compose(
  connect(
    (state: State) => ({
      disabled: state.auth.formDisabled,
      verified: state.user && state.user.verified,
    }),
  ),
  injectIntl,
)(VerifyUserPage);
