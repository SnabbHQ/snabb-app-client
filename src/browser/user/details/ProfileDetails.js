/* @flow */
import React from 'react';
import linksMessages from '../../../common/app/linksMessages';
import { Card, Title, Box } from '../../app/components';
import BusinessInfoField from './BusinessInfoField';
import ChangePasswordField from './ChangePasswordField';

const ProfileDetails = () => (
  <Box>
    <Title message={linksMessages.profile} />
    <Card>
      <BusinessInfoField />
    </Card>
    <Card>
      <ChangePasswordField />
    </Card>
  </Box>
);

export default ProfileDetails;

