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

const calculateHeaderPadding = (includeHeader, emailVerified) => (
  includeHeader ? !emailVerified ? 3.5 : 2 : 0
);

const Page = ({
  component: Component,
  includeHeader = false,
  emailVerified = false,
  ...props
}: PageProps) => (
  <Match
    {...props}
    render={renderProps => (
    <Container>
      { includeHeader &&
        <Fixed top left right zIndex={5}>
        <Box>
            { !emailVerified && <AppMessage /> }
            <Header />
          </Box>
        </Fixed>
      }
      <Box
        paddingTop={calculateHeaderPadding(includeHeader, emailVerified)}
      >
        <Component {...renderProps} />
      </Box>
    </Container>
    )}
  />
);

export default connect(
  (state: State) => ({
    emailVerified: state.user.profile && state.user.profile.verified,
  }),
)(Page);
