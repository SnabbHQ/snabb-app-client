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
    display="block"
    bold
    color="black"
    exactly={exactly}
    marginVertical={marginVertical}
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
  <Container maxWidth="800px">
    <Box display="flex" paddingTop={3}>
      <LeftPanel>
        <Box paddingHorizontal={1}>
          <ProfileLink to={`${pathname}/details`} message={linksMessages.account} />
          <ProfileLink marginVertical={1} to={`${pathname}/billing`} message={linksMessages.billing} />
          <ProfileLink marginVertical={1} to={`${pathname}/billing`} message={linksMessages.password} />
        </Box>
      </LeftPanel>
      <RightPanel>
        <Box paddingHorizontal={1}>
          <Match pattern={`${pathname}/details`} component={ProfileDetails} />
          <Match pattern={`${pathname}/billing`} component={Billing} />
        </Box>
      </RightPanel>
    </Box>
  </Container>
);

export default SettingsPage;
