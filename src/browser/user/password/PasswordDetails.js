/* @flow */
import React from 'react';
import linksMessages from '../../../common/app/linksMessages';
import { Title, Box } from '../../app/components';
import PasswordFields from './PasswordFields';

const PasswordDetails = () => (
  <Box>
    <Title message={linksMessages.changePassword} />
    <PasswordFields />
  </Box>
);

export default PasswordDetails;

