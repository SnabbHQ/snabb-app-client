/* @flow */
import type { State, User } from '../../common/types';
import React, { PropTypes } from 'react';
import linksMessages from '../../common/app/linksMessages';
import { NewDeliveryButton } from '../job/components';
import { FormattedMessage } from 'react-intl';
import { Fixed, Link, Text, Box, Image, Space } from '../app/components';
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

const Header = ({ user }: HeaderProps, { router }: Object) => {
  const onProfileImageClick = () => {
    router.transitionTo('/profile/details');
  };

  return (
    <Fixed top left right zIndex={5}>
      <Box
        backgroundColor="black"
        display="flex"
        flexWrap="wrap"
        paddingVertical={0.3}
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
          <Text color="white" size={1}>Snabb</Text>
        </Box>
        <Space auto />
        <HeaderLink to="/active" message={linksMessages.active} />
        <HeaderLink to="/history" message={linksMessages.history} />
        <Space auto />
        <Box
          display="flex"
          alignItems="center"
        >
          <NewDeliveryButton />
          <Space x={1} />
          <Image
            height={40}
            width={40}
            alt="Snabb"
            src={clientPhoto}
            onClick={onProfileImageClick}
          />
        </Box>
        <Space x={1} />
      </Box>
    </Fixed>
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

