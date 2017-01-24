/* @flow */
import React from 'react';
import linksMessages from '../../../common/app/linksMessages';
import { Title, Box } from '../../app/components';
import ResetPasswordFields from './ResetPasswordFields';

const PasswordDetails = (props) => (
  <Box
    padding={1}
    display="flex"
    flexDirection="row"
    marginTop={3}
    justifyContent="center"
  >
    <Title message={linksMessages.resetPassword} />
    <Box width={20}>
      <ResetPasswordFields
        hash={props.params.hash}
      />
    </Box>
  </Box>
);

export default PasswordDetails;

