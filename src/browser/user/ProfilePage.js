/* @flow */
import React from 'react';
import { Container, Text, Box } from '../app/components';
import { Match } from '../../common/app/components';
import styled from '../app/components/styled';
import BillingPage from './BillingPage';
import ProfileDetailsPage from './ProfileDetailsPage';


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

const ProfilePage = ({ pathname }) => (
  <Container maxWidth="1140px">
    <Box display="flex">
      <LeftPanel>
        <Text display="block">Hola</Text>
        <Text display="block">Hola</Text>
        <Text display="block">Hola2</Text>
      </LeftPanel>
      <RightPanel>
        <Box marginLeft="5em">
          <Match pattern={`${pathname}/details`} component={ProfileDetailsPage} />
          <Match pattern={`${pathname}/billing`} component={BillingPage} />
        </Box>
      </RightPanel>
    </Box>
  </Container>
);


//  <Match exactly pattern="/profile/password" component={NewJobPage} />

export default ProfilePage;
