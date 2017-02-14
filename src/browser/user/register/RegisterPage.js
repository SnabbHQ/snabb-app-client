/* @flow */
import type { State } from '../../../common/types';
import RegisterFields from './RegisterFields';
import R from 'ramda';
import React from 'react';
import linksMessages from '../../../common/app/linksMessages';
import userMessages from '../../../common/user/userMessages';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { CenteredBox, Text, Title, Box, Image, Link } from '../../app/components';
import { resetUserState } from '../../../common/user/actions';

// $FlowFixMe
const logo = require('../../../common/app/images/logo.svg');

const RegisterPage = ({ intl, location, authed, resetUserState }) => {

  const backToLogin = () => {
    resetUserState();
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
              {intl.formatMessage(userMessages.createAccountHeader)}
            </Text>
            <Box display="flex" alignItems="center" flexDirection="column" marginBottom={2}>
              <Image
                alt="Snabb logo"
                height={45}
                width={110}
                src={logo}
              />
            </Box>

            <RegisterFields />
            <CenteredBox>
              <Box display="block">
                <Text display="block" size={-1}>
                  <FormattedHTMLMessage {...userMessages.termsAndPrivacy} />
                </Text>
                <CenteredBox marginVertical={1}>
                  <Link
                    color="black"
                    onClick={backToLogin}
                    size={1}
                    to={'/login'}
                  >
                    <FormattedMessage {...userMessages.alreadyAccount} />
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
    { resetUserState },
  ),
  injectIntl,
)(RegisterPage);
