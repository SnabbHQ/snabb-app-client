/* @flow */
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';
import { Container, Link, Box } from '../app/components';
import { Match } from '../../common/app/components';
import styled from '../app/components/styled';
import Billing from './billing/Billing';
import ProfileDetails from './details/ProfileDetails';


const LeftPanel = styled(() => ({
  $extends: Box,
  height: '100mvh',
  width: '60%',
  '@media (min-width: 1200px)': {
    width: '20%',
  },
  '@media (max-width: 768px)': {
    width: '100%',
  },
}));


const RightPanel = styled(() => ({
  $extends: Box,
  height: '100mvh',
  width: '60%',
  '@media (min-width: 1200px)': {
    width: '80%',
  },
  '@media (max-width: 768px)': {
    width: '100%',
  },
}));

const ProfileLink = ({ exactly, to, message }) => (
  <Link
    display="block"
    bold
    color="black"
    exactly={exactly}
    marginHorizontal={1}
    to={to}
  >
    <FormattedMessage {...message} />
  </Link>
);

const ProfilePage = ({ pathname }) => (
  <Container maxWidth="1140px">
    <Box display="flex">
      <LeftPanel>
        <ProfileLink to={`${pathname}/details`} message={linksMessages.accountDetails} />
        <ProfileLink to={`${pathname}/billing`} message={linksMessages.billing} />
      </LeftPanel>
      <RightPanel>
        <Box marginLeft="5em">
          <Match pattern={`${pathname}/details`} component={ProfileDetails} />
          <Match pattern={`${pathname}/billing`} component={Billing} />
        </Box>
      </RightPanel>
    </Box>
  </Container>
);


//  <Match exactly pattern="/profile/password" component={NewJobPage} />

export default ProfilePage;
