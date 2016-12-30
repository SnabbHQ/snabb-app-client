// @flow
import React, { Component } from 'react';
import Header from './Header';
import { Match } from '../../common/app/components';
import { Box, Container } from './components';

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
        <Box>
          <Header />
        </Box>
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
