/* @flow */
import React from 'react';
import linksMessages from '../../../common/app/linksMessages';
import { Title, Box } from '../../app/components';
import UpdatePasswordFields from './UpdatePasswordFields';

const PasswordDetails = () => (
  <Box>
    <Title message={linksMessages.changePassword} />
    <UpdatePasswordFields />
  </Box>
);

export default PasswordDetails;

