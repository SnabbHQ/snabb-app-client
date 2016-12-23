// @flow
import React, { Component } from 'react';
import Header from './Header';
import SideMenu from './SideMenu';
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
          <SideMenu />
        </Box>
      }
      <Box
        marginLeft={includeHeader && 3}
        paddingTop={includeHeader && 2}
      >
        <Component {...renderProps} />
      </Box>
    </Container>
    )}
  />
);

export default Page;
