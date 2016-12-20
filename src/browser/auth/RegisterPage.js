/* @flow */
import type { State } from '../../common/types';
import RegisterFields from './RegisterFields';
import R from 'ramda';
import React from 'react';
import SignInError from './SignInError';
import linksMessages from '../../common/app/linksMessages';
import authMessages from '../../common/auth/authMessages';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Block, Divider, Link, Image, Text, Title, Loading, Box } from '../app/components';
import { Message } from '../app/components-old';

// $FlowFixMe
const logo = require('../../../assets/images/logoBlack.svg');

const RegisterPage = ({ disabled, intl, location, authed }) => (
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
          <Box marginBottom={1}>
            <Image
              alt="Snabb logo"
              height={100}
              width={100}
              src={logo}
            />
          </Box>
          <Text
            align="center"
            display="block"
            size={2}
            marginVertical="1em"
          >
            {intl.formatMessage(authMessages.createAccountHeader)}
          </Text>
          <RegisterFields />
          <Divider marginVertical="0.3em" />
          <Box display="block">
            <Text size={-1}>{intl.formatMessage(authMessages.termsLabelPart1)}</Text>
            <Link
              bold
              antialiasing
              color="accent"
              to="/todo"
              size={-1}
              align="center"
            >
              <FormattedMessage {...linksMessages.terms} />
            </Link>
            <Text size={-1}>{intl.formatMessage(authMessages.termsLabelPart2)}</Text>
            <Link
              bold
              antialiasing
              color="accent"
              to="/todo"
              align="center"
              size={-1}
            >
              <FormattedMessage {...linksMessages.privacyPolicy} />
            </Link>
          </Box>
        </Block>
        <SignInError />
        { disabled &&
        <Loading>
          {message => <Message>{message}</Message>}
        </Loading>
        }
      </Box>
    </Box>
);


RegisterPage.propTypes = {
  disabled: React.PropTypes.bool.isRequired,
  intl: intlShape,
  location: React.PropTypes.object.isRequired,
  authed: React.PropTypes.string,
};

export default R.compose(
  connect(
    (state: State) => ({
      disabled: state.auth.form.disabled,
      authed: state.user.profile.email,
    }),
  ),
  injectIntl,
)(RegisterPage);
