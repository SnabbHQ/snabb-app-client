/* @flow */
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';
import { Container, Link, Box } from '../app/components';
import { Match } from '../../common/app/components';
import styled from '../app/components/styled';
import BillingDetails from './billing/BillingDetails';
import ChangePasswordDetails from './updatePassword/UpdatePasswordDetails';
import ProfileDetails from './details/ProfileDetails';


const LeftPanel = styled({
  $extends: Box,
  height: '100mvh',
  width: '25%',
});


const RightPanel = styled(() => ({
  $extends: Box,
  height: '100mvh',
  width: '75%',
}));

const ProfileLink = ({
  exactly,
  to,
  message,
  marginVertical = 0.5,
}) => (
  <Link
    activeColor="black"
    display="block"
    color="gray"
    exactly={exactly}
    marginVertical={marginVertical}
    size={1}
    to={to}
  >
    <FormattedMessage {...message} />
  </Link>
);

// TODO - Let's discuss why this would even be a good idea.
// const SignOutAction = ({
//   message,
//   marginVertical = 0.5,
// }) => (
//   <Button
//     activeColor="black"
//     display="block"
//     color="gray"
//     marginVertical={marginVertical}
//     size={1}
//     inline
//     paddingHorizontal={0}
//   >
//     <FormattedMessage {...message} />
//   </Button>
// );
// <SignOutAction marginVertical={2} message={buttonMessages.s} />

type SettingsPageProps = {
  pathname: string,
}

const SettingsPage = ({ pathname }: SettingsPageProps) => (
  <Container maxWidth="900px">
    <Box display="flex" paddingTop={3}>
      <LeftPanel>
        <Box paddingHorizontal={1}>
          <ProfileLink to={`${pathname}/details`} message={linksMessages.account} />
          <ProfileLink marginVertical={1} to={`${pathname}/billing`} message={linksMessages.billing} />
          <ProfileLink marginVertical={1} to={`${pathname}/password`} message={linksMessages.password} />
        </Box>
      </LeftPanel>
      <RightPanel>
        <Box paddingHorizontal={1}>
          <Match pattern={`${pathname}/details`} component={ProfileDetails} />
          <Match pattern={`${pathname}/billing`} component={BillingDetails} />
          <Match pattern={`${pathname}/password`} component={ChangePasswordDetails} />
        </Box>
      </RightPanel>
    </Box>
  </Container>
);

export default SettingsPage;
