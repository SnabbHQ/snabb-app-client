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
import { Block, Text, Title, Box, Link } from '../../app/components';

// $FlowFixMe
//const logo = require('../../../common/app/images/logoBlack.svg');

const RegisterPage = ({ intl, location, authed }) => (
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
      flexDirection="column"
      display="flex"
      marginTop={3}
      alignItems="center"
      justifyContent="center"
    >
      <Box width={20}>
        <Title message={linksMessages.register} />
        <Block>
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
            marginBottom={1}
            bold
          >
            Snabb
          </Text>
          <RegisterFields />
          <Box display="flex">
            <Text display="block" size={-1} marginVertical={1}>
              <FormattedHTMLMessage {...authMessages.termsAndPrivacy} />
            </Text>
            <Box display="flex" justifyContent="center" marginVertical={1}>
              <Link
                size={1}
                to={'/login'}
              >
                <FormattedMessage {...authMessages.alreadyAccount} />
              </Link>
            </Box>
          </Box>
        </Block>
      </Box>
    </Box>
);


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
  ),
  injectIntl,
)(RegisterPage);
