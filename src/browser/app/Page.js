// @flow
import React, { Component } from 'react';
import Header from './Header';
import AppMessage from './AppMessage';
import { Match } from '../../common/app/components';
import { Box, Container, Fixed } from './components';

type PageProps = {
  component: Component,
  includeHeader?: boolean,
}

const Page = ({ component: Component, includeHeader, ...props }: PageProps) => (
  <Match
    {...props}
    render={renderProps => (
    <Container>
      { includeHeader &&
        <Fixed top left right zIndex={5}>
        <Box>
            <AppMessage />
            <Header />
          </Box>
        </Fixed>
      }
      <Box
        paddingTop={includeHeader && 3}
      >
        <Component {...renderProps} />
      </Box>
    </Container>
    )}
  />
);

export default Page;
