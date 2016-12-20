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
        backgroundColor={'#f5f7fa'} // TODO - use the theme.colors.bodyBackground instead
        flex={1}
        marginLeft={includeHeader && 5}
        paddingTop={includeHeader && 5}
      >
        <Component {...renderProps} />
      </Box>
    </Container>
    )}
  />
);

export default Page;
