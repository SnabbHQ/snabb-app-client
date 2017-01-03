/* @flow */
import React from 'react';
import { Fixed, Title, Button, Heading, Box } from '../../app/components';
import { FormattedMessage } from 'react-intl';
import DeliveryFields from './DeliveryFields';
import GoogleMap from 'google-map-react';
import styled from '../../app/components/styled';


const LeftPanel = styled((theme) => ({
  $extends: Box,
  display: 'block',
  height: '100mvh',
  width: '60%',
  '@media (min-width: 1200px)': {
    width: '40%',
  },
  '@media (max-width: 768px)': {
    width: '100%',
  },
  paddingRight: '3em',
  paddingLeft: '3em',
  paddingTop: '3em',
  paddingBottom: '5em',
  boxShadow: '0 2px 5px 0 rgba(0,0,0,.25)',
  backgroundColor: theme.colors.white,
}));

const RequestPanel = styled(() => ({
  $extends: LeftPanel,
  position: 'fixed',
  marginLeft: '2em',
  '@media (min-width: 1200px)': {
    width: '40%',
    marginLeft: '3em',
  },
  '@media (max-width: 768px)': {
    width: '100%',
    marginLeft: '1em',
  },
  height: '60px',
  boxShadow: '0 -1px 1px rgba(0,0,0,.08)',
  paddingRight: '0px',
  paddingLeft: '0px',
  paddingTop: '0px',
  paddingBottom: '0px',
  bottom: '0px',
  left: '0em',
}));

const RightPanel = styled(() => ({
  $extends: Fixed,
  bottom: '0px',
  right: '0px',
  top: '0px',
  width: '40%',
  '@media (min-width: 1200px)': {
    width: '60%',
  },
  '@media (max-width: 768px)': {
    width: '0%',
  },
  marginLeft: '1em',
  zIndex: -1,
}));

const NewJobPage = () => {
  function renderRequestButton() {
    return (
      <RequestPanel>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          height="100%"
          paddingRight={1}
        >
          <Button primary>
            <FormattedMessage
              id="newJobPage.requestButtonDisabled"
              defaultMessage="Request"
            />
          </Button>
        </Box>
      </RequestPanel>
    );
  }

  const defaultProps = {
    center: { lat: 39.470128, lng: -0.370621 },
    zoom: 16,
    greatPlaceCoords: { lat: 59.724465, lng: 30.080121 },
  };

  return (
    <Box>
      <Title message="Snabb - New Delivery" />
      <LeftPanel>
        <Heading size={3}>New Delivery</Heading>
        <DeliveryFields />
        {renderRequestButton()}
      </LeftPanel>
      <RightPanel>
        <RightPanel />
        <GoogleMap
          bootstrapURLKeys={{
            key: 'AIzaSyAap17mxLF2XLZdnisFJeJd9bniprOKXCs',
            language: 'en',
          }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        />
      </RightPanel>
    </Box>
  );
};

export default NewJobPage;
