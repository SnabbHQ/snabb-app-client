/* @flow */
import type { State } from '../../../common/types';
import RegisterFields from './RegisterFields';
import R from 'ramda';
import React from 'react';
import linksMessages from '../../../common/app/linksMessages';
import authMessages from '../../../common/auth/authMessages';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedHTMLMessage } from 'react-intl';
import { Block, Text, Title, Box } from '../../app/components';

// $FlowFixMe
const logo = require('../../../common/app/images/logoBlack.svg');

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
    <Box display="flex" height="100%" marginTop="3em" alignItems="center" justifyContent="center">
      <Box width="500px">
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
            marginBottom="1em"
            fontWeight="bold"
          >
            Snabb
          </Text>
          <RegisterFields />
          <Box display="flex" justifyContent="center">
            <Box display="block" width="40%">
              <Text>
                {intl.formatMessage(authMessages.termsAndPrivacy)}
              </Text>
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
