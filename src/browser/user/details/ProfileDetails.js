/* @flow */
import React from 'react';
import linksMessages from '../../../common/app/linksMessages';
import { Title, Box } from '../../app/components';
import AccountInfoFields from './AccountInfoFields';
import LogOut from '../../auth/LogoutButton';

const ProfileDetails = () => (
  <Box>
    <Title message={linksMessages.profile} />
      <AccountInfoFields />
    <LogOut />
  </Box>
);

export default ProfileDetails;

