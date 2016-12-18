/* @flow */
import type {User } from '../../common/types';
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';
import { Fixed, Text, Link, Box, Image } from '../app/components';
import { Space } from '../app/components-old';
import { connect } from 'react-redux';

const logo = require('../../../assets/images/logo.svg');

type HeaderLinkProps = {
  exactly?: boolean,
  to: string,
  message: Object,
};

const SideMenuLink = ({ exactly, to, message }: HeaderLinkProps) => (
  <Box
    display="block"
    justifyContent="center"
    alignItems="center"
    marginVertical="1.5em"
    marginHorizontal="0.6em"
  >
    <Image
      alt="Snabb logo"
      height={50}
      width={50}
      src={logo}
    />

    <Link
      display="block"
      bold
      antialiasing
      color="white"
      exactly={exactly}
      to={to}
      size={-1}
      width="100%"
      align="center"
    >
      <FormattedMessage {...message} />
    </Link>
  </Box>
);

const SideMenu = () => (
  <Fixed
    top
    left
    bottom
    backgroundColor="black"
    zIndex={2}
    overFlowX="hidden"
    paddingTop="3em"
    boxShadow="0 1px 2px rgba(0,0,0,0.15)"
  >
    <Space x={3} />
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

