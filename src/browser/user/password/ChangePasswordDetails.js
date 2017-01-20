/* @flow */
import React from 'react';
import linksMessages from '../../../common/app/linksMessages';
import { Title, Box } from '../../app/components';
import ChangePasswordFields from './ChangePasswordFields';

const PasswordDetails = () => (
  <Box>
    <Title message={linksMessages.changePassword} />
    <ChangePasswordFields />
  </Box>
);

export default PasswordDetails;

