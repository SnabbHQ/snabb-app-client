/* @flow */
import R from 'ramda';
import React from 'react';
import linksMessages from '../../../common/app/linksMessages';
import { Title, Box, Full } from '../../app/components';
import {connect} from 'react-redux';
import ResetPasswordFields from './ResetPasswordFields';
import ResetPasswordSuccessful from './ResetPasswordSuccessful';

type ResetPasswordPageProps = {
  error: ?Object,
  resetPasswordSuccess: boolean,
  params: any
};

const ResetPasswordPage = ({error, resetPasswordSuccess, params}: ResetPasswordPageProps) => (
  <Full>
    { resetPasswordSuccess ?
      <ResetPasswordSuccessful />
      :
      <Box
        padding={1}
        display="flex"
        flexDirection="row"
        marginTop={3}
        justifyContent="center"
      >
        <Title message={linksMessages.resetPassword} />
        <Box width={20} >
          <ResetPasswordFields
            hash={params.hash}
          />
        </Box>
      </Box>
    }
  </Full>
);



export default R.compose(
  connect(
    (state: State) => ({
      error: state.user.error,
      resetPasswordSuccess: state.user.resetPasswordSuccess
    }),
  )
)(ResetPasswordPage);

