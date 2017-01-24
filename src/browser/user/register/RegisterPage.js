/* @flow */
import type { State } from '../../../common/types';
import RegisterFields from './RegisterFields';
import R from 'ramda';
import React from 'react';
import linksMessages from '../../../common/app/linksMessages';
import authMessages from '../../../common/auth/authMessages';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { CenteredBox, Text, Title, Box, Link } from '../../app/components';
import { resetAuthState } from '../../../common/auth/actions';

// $FlowFixMe
//const logo = require('../../../common/app/images/logoBlack.svg');

const RegisterPage = ({ intl, location, authed, resetAuthState }) => {

  const backToLogin = () => {
    resetAuthState();
  };

  return (
    authed ?
      <Redirect
        to={(
        location.state &&
        location.state.from &&
        location.state.from.pathname
      ) || '/'}
      />
      :
      <Box
        padding={1}
        display="flex"
        flexDirection="row"
        marginTop={3}
        justifyContent="center"
      >
        <Box width={20}>
          <Title message={linksMessages.register} />
          <Box display="block">
            <Text
              align="center"
              display="block"
              size={2}
            >
              {intl.formatMessage(authMessages.createAccountHeader)}
            </Text>
            <Text
              align="center"
              display="block"
              size={2}
              marginBottom={0.5}
              bold
            >
              Snabb
            </Text>
            <RegisterFields />
            <CenteredBox>
              <Box display="block">
                <Text display="block" size={-1}>
                  <FormattedHTMLMessage {...authMessages.termsAndPrivacy} />
                </Text>
                <CenteredBox marginVertical={1}>
                  <Link
                    onClick={backToLogin}
                    size={1}
                    to={'/login'}
                  >
                    <FormattedMessage {...authMessages.alreadyAccount} />
                  </Link>
                </CenteredBox>
              </Box>
            </CenteredBox>
          </Box>
        </Box>
      </Box>
  );
};


RegisterPage.propTypes = {
  intl: intlShape,
  location: React.PropTypes.object.isRequired,
  authed: React.PropTypes.object,
};

export default R.compose(
  connect(
    (state: State) => ({
      authed: state.user.profile,
    }),
    { resetAuthState },
  ),
  injectIntl,
)(RegisterPage);