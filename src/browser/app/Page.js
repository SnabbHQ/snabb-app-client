// @flow
import type { State } from '../../common/types';
import React from 'react';
import Header from './Header';
import AppMessage from './AppMessage';
import { connect } from 'react-redux';
import { Match } from '../../common/app/components';
import { Box, Container, Fixed } from './components';

type PageProps = {
  component: any,
  emailVerified?: boolean,
  includeHeader?: boolean,
  messageShown?: boolean,
}

const calculateHeaderPadding = (includeHeader, messageShown) => (
  includeHeader ? messageShown ? 3.5 : 2 : 0
);

const Page = ({
  component: Component,
  includeHeader = false,
  messageShown,
  emailVerified,
  ...props
}: PageProps) => (
  <Match
    {...props}
    render={renderProps => (
    <Container>
      { includeHeader &&
        <Fixed top left right zIndex={5}>
        <Box>
            { !emailVerified && messageShown && <AppMessage /> }
            <Header />
          </Box>
        </Fixed>
      }
      <Box
        paddingTop={calculateHeaderPadding(includeHeader, messageShown)}
      >
        <Component {...renderProps} />
      </Box>
    </Container>
    )}
  />
);

export default connect(
  (state: State) => ({
    messageShown: state.app.messageShown,
    emailVerified: state.user.profile && state.user.profile.verified,
  }),
)(Page);
