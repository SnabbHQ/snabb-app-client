/* @flow */
import React from 'react';
import { Fixed, Text, Title, Button, Heading, Box } from '../../app/components';
import { FormattedMessage } from 'react-intl';
import DeliveryFields from './DeliveryFields';
import GoogleMap from 'google-map-react';
import styled from '../../app/components/styled';

const RightPanel = styled((theme) => ({
  $extends: Box,
  display: 'block',
  height: '100mvh',
  float: 'right',
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
  boxShadow: '-1px 2px 5px 0 rgba(0,0,0,.25)',
  backgroundColor: theme.colors.white,
  zIndex: 1,
}));

const LeftPanel = styled((theme) => ({
  $extends: Fixed,
  bottom: '0px',
  left: '0px',
  top: '0px',
  backgroundColor: 'black',
  width: '40%',
  '@media (min-width: 1200px)': {
    width: '60%',
  },
  '@media (max-width: 768px)': {
    width: '0%',
  },
  zIndex: 0,
}));

const RequestPanel = styled(() => ({
  $extends: RightPanel,
  backgroundColor: '#f6f6f6',
  position: 'fixed',
  height: '70px',
  boxShadow: '0 -1px 1px rgba(0,0,0,.08)',
  bottom: '0px',
  paddingRight: '0px',
  paddingLeft: '0px',
  paddingTop: '0px',
  paddingBottom: '0px',
  right: '0px',
  zIndex: 2,
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
        <GoogleMap
          bootstrapURLKeys={{
            key: 'AIzaSyAap17mxLF2XLZdnisFJeJd9bniprOKXCs',
            language: 'en',
          }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        />
      </LeftPanel>
      <RightPanel>
        <DeliveryFields />
        {renderRequestButton()}
      </RightPanel>
    </Box>
  );
};

export default NewJobPage;
