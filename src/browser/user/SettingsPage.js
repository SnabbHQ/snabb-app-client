/* @flow */
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';
import { Container, Link, Box } from '../app/components';
import { Match } from '../../common/app/components';
import styled from '../app/components/styled';
import Billing from './billing/Billing';
import ProfileDetails from './details/ProfileDetails';


const LeftPanel = styled({
  $extends: Box,
  height: '100mvh',
  width: '60%',
  '@media (min-width: 1200px)': {
    width: '20%',
  },
  '@media (max-width: 768px)': {
    width: '100%',
  },
});


const RightPanel = styled(() => ({
  $extends: Box,
  height: '100mvh',
  width: '60%',
  '@media (min-width: 1200px)': {
    width: '60%',
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
    marginVertical={1}
    size={1}
    to={to}
  >
    <FormattedMessage {...message} />
  </Link>
);

type SettingsPageProps = {
  pathname: string,
}

const SettingsPage = ({ pathname }: SettingsPageProps) => (
  <Container maxWidth="1140px">
    <Box display="flex" paddingTop={3}>
      <LeftPanel>
        <ProfileLink to={`${pathname}/details`} message={linksMessages.account} />
        <ProfileLink to={`${pathname}/billing`} message={linksMessages.billing} />
        <ProfileLink to={`${pathname}/billing`} message={linksMessages.password} />
      </LeftPanel>
      <RightPanel>
        <Box marginLeft={5}>
          <Match pattern={`${pathname}/details`} component={ProfileDetails} />
          <Match pattern={`${pathname}/billing`} component={Billing} />
        </Box>
      </RightPanel>
    </Box>
  </Container>
);

export default SettingsPage;
