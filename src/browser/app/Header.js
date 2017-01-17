/* @flow */
import type { State, User } from '../../common/types';
import React, { PropTypes } from 'react';
import linksMessages from '../../common/app/linksMessages';
import { NewDeliveryButton } from '../job/components';
import { FormattedMessage } from 'react-intl';
import { Link, Text, Box, Image, Space } from '../app/components';
import { connect } from 'react-redux';

// $FlowFixMe
const logo = require('../../common/app/images/logo.svg');

// $FlowFixMe
const clientPhoto = require('../../common/app/images/clientPhotoDefaultSmall.svg');


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
    bold
    color="black"
    exactly={exactly}
    marginHorizontal={1}
    to={to}
  >
    <FormattedMessage {...message} />
  </Link>
);

const Header = ({ user }: HeaderProps, { router }: Object) => {
  const onProfileImageClick = () => {
    router.transitionTo('/profile/details');
  };

  return (
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
          width={50}
          src={logo}
        />
        <Space x={1} />
        <Text size={1}>Snabb</Text>
      </Box>
      <Space auto />
      <HeaderLink to="/active" message={linksMessages.active} />
      <HeaderLink to="/history" message={linksMessages.history} />
      <HeaderLink to="/settings" message={linksMessages.settings} />
      <Space auto />
      <Box
        display="flex"
        alignItems="center"
      >
        <NewDeliveryButton />
      </Box>
      <Space x={1} />
    </Box>
  );
};

Header.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default connect(
  (state: State) => ({
    user: state.user,
  }),
)(Header);

