/* @flow */
import React from 'react';
import { Fixed, Container, Text, Button, Box } from '../app/components';
import { FormattedMessage } from 'react-intl';
import styled from '../app/components/styled';


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

const ProfilePage = () => (
  <Container maxWidth="1140px">
    <Box display="flex">
      <LeftPanel>
        <Text>Hola</Text>
      </LeftPanel>
      <RightPanel>
        <Text>Hola</Text>
      </RightPanel>
    </Box>
  </Container>
);

export default ProfilePage;
