/* @flow */
import React from 'react';
import { Fixed, Container, Text, Button, Box } from '../app/components';
import { FormattedMessage } from 'react-intl';
import { Match } from '../../common/app/components';
import styled from '../app/components/styled';
import ProfilePage from './ProfilePage';
import BillingPage from './BillingPage';


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

const ProfileContainer = () => (
  <Container maxWidth="1140px">
    <Box display="flex">
      <LeftPanel>
        <Text display="block">Hola</Text>
        <Text display="block">Hola</Text>
        <Text display="block">Hola</Text>
        <Text>Hola</Text>
      </LeftPanel>
      <RightPanel>
        <Box marginLeft="5em">
          <Match exactly pattern="/profile/profiles" component={BillingPage} />
          <Match exactly pattern="/profile/billing" component={BillingPage} />
        </Box>
      </RightPanel>
    </Box>
  </Container>
);


//  <Match exactly pattern="/profile/password" component={NewJobPage} />

export default ProfileContainer;
