/* @flow */
import type { State, User } from '../../common/types';
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { NewDeliveryButton } from '../job/components';
import { FormattedMessage } from 'react-intl';
import { Fixed, Link, Box, Image } from '../app/components';
import { Space } from '../app/components-old';
import { connect } from 'react-redux';

// $FlowFixMe
const logo = require('../../../assets/images/logo.svg');

// $FlowFixMe
const clientPhoto = require('../../../assets/images/clientPhotoDefaultSmall.svg');


type HeaderProps = {
  viewer: ?User,
};

type HeaderLinkProps = {
  exactly?: boolean,
  to: string,
  message: Object,
};

const HeaderLink = ({ exactly, to, message }: HeaderLinkProps) => (
  <Link
    antialiasing
    bold
    color="white"
    exactly={exactly}
    marginHorizontal="1.5em"
    to={to}
  >
    <FormattedMessage {...message} />
  </Link>
);

const Header = ({ viewer }: HeaderProps) => (
  <Fixed top left right zIndex={2}>
    <Box
      backgroundColor="white"
      display="flex"
      flexWrap="wrap"
      paddingVertical={0.7}
      border="bottom"
    >
      <Space auto />
      <Box
        display="flex"
        alignItems="center"
      >
        <NewDeliveryButton />
        <Space x={2} />
        <Image
          height={40}
          width={40}
          alt="Snabb"
          src={clientPhoto}
        />
      </Box>
      <Space x={2} />
    </Box>
  </Fixed>
);

export default connect(
  (state: State) => ({
    viewer: {}, // state.users.viewer,
  }),
)(Header);

