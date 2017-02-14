/* @flow */
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { NewDeliveryButton } from '../job/components';
import { FormattedMessage } from 'react-intl';
import { Link, Text, Box, Image, Space } from '../app/components';

// $FlowFixMe
const logo = require('../../common/app/images/logo.svg');

type HeaderLinkProps = {
  exactly?: boolean,
  to: string,
  message: Object,
};

const HeaderLink = ({ exactly, to, message }: HeaderLinkProps) => (
  <Link
    color="black"
    exactly={exactly}
    marginHorizontal={1}
    to={to}
  >
    <FormattedMessage {...message} />
  </Link>
);

const Header = () => (
    <Box
      backgroundColor="white"
      display="flex"
      flexWrap="wrap"
      boxShadow="0 1px 2px rgba(0,0,0,0.15)"
    >
      <Space x={1} />
      <Box
        display="flex"
        alignItems="center"
      >
        <Image
          alt="Snabb logo"
          height={50}
          width={80}
          src={logo}
        />
      </Box>
      <Space auto />
      <Box
        display="flex"
        alignItems="center"
      >
        <HeaderLink to="/active" message={linksMessages.active} />
        <HeaderLink to="/history" message={linksMessages.history} />
        <HeaderLink to="/settings/details" message={linksMessages.settings} />
      </Box>
      <Space auto />
      <NewDeliveryButton />
      <Space x={1} />
    </Box>
  );

export default Header;

