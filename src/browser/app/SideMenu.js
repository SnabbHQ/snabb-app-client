/* @flow */
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';
import { Fixed, Box, Link, Image } from '../app/components';
import { connect } from 'react-redux';

const logo = require('../../common/app/images/logo.svg');

type HeaderLinkProps = {
  exactly?: boolean,
  to: string,
  message: Object,
};

const SideMenuLink = ({ exactly, to, message }: HeaderLinkProps) => (
  <Link
    marginVertical={3}
    marginHorizontal={1}
    display="block"
    bold
    antialiasing
    color="white"
    exactly={exactly}
    to={to}
    size={-1}
    align="center"
  >
    <Box backgroundColor="white" width="2px" height="100%" display="block" />
    <Image
      alt="Snabb logo"
      height={40}
      src={logo}
    />
    <FormattedMessage {...message} />
  </Link>
);

const SideMenu = () => (
  <Fixed
    top
    left
    bottom
    backgroundColor="black"
    zIndex={2}
    overFlowX="hidden"
    paddingTop="4em"
    boxShadow="0 1px 2px rgba(0,0,0,0.15)"
  >
    <SideMenuLink exactly to="/" message={linksMessages.active} />
    <SideMenuLink to="/active" message={linksMessages.active} />
    <SideMenuLink to="/scheduled" message={linksMessages.scheduled} />
    <SideMenuLink to="/past" message={linksMessages.past} />
  </Fixed>
);

export default connect(
  () => ({
    viewer: {}, // state.users.viewer,
  }),
)(SideMenu);

