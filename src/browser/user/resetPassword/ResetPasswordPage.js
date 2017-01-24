/* @flow */
import React from 'react';
import linksMessages from '../../../common/app/linksMessages';
import { Title, Box } from '../../app/components';
import ResetPasswordFields from './ResetPasswordFields';

const PasswordDetails = () => (
  <Box
    padding={1}
    display="flex"
    flexDirection="row"
    marginTop={3}
    justifyContent="center"
  >
    <Title message={linksMessages.resetPassword} />
    <Box width={20}>
      <ResetPasswordFields />
    </Box>
  </Box>
);

export default PasswordDetails;

