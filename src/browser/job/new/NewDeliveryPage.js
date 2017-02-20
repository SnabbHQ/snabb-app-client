/* @flow */
import React, { PropTypes } from 'react';
import {Fixed, Text, Title, Button, Space, Container, Image, Box} from '../../app/components';
import {FormattedMessage} from 'react-intl';
import buttonsMessages from '../../../common/app/buttonsMessages';
import jobMessages from '../../../common/delivery/jobMessages';
import DeliveryFields from './DeliveryFields';
import GoogleMap from 'google-map-react';
import styled from '../../app/components/styled';

// $FlowFixMe
const logo = require('../../../common/app/images/logo.svg');

const RightPanel = styled((theme) => ({
  $extends: Box,
  display: 'block',
  height: '100mvh',
  float: 'right',
  width: '60%',
  '@media (min-width: 1200px)': {
    width: '50%',
  },
  '@media (max-width: 768px)': {
    width: '100%',
  },
  paddingRight: '3em',
  paddingLeft: '3em',
  paddingTop: '2em',
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
    width: '50%',
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

const CancelDeliveryHeaderButton = ({}, { router }: Object) => {
  const onButtonClick = () => {
    // TODO
    // analytics.track('Clicked cancel delivery button', {
    //   category: analytics.DELIVERY_REQUEST_FLOW_CATEGORY,
    //   position: this.props.position
    // })

    router.transitionTo('/active');
  };

  return (
    <Button
      size={0}
      onClick={onButtonClick}
      color="#777"
    >
      <FormattedMessage {...buttonsMessages.cancel} />
    </Button>
  );
};

CancelDeliveryHeaderButton.contextTypes = {
  router: PropTypes.object.isRequired,
};

const NewJobPageHeader = () => (
  <Fixed top left right zIndex={5} >
    <Box
      backgroundColor="white"
      display="flex"
      flexWrap="wrap"
      boxShadow="0 1px 2px rgba(0,0,0,0.15)"
    >
      <Space x={1} />
      <Box
        display="flex"
        alignItems="center"
      >
        <Image
          alt="Snabb logo"
          height={56}
          width={80}
          src={logo}
        />
      </Box>
      <Space auto />
      <Box
        display="flex"
        alignItems="center"
      >
        <Text size={1}>
          <FormattedMessage {...jobMessages.newDelivery} />
        </Text>
      </Box>
      <Space auto />
      <Box display="flex" alignItems="center">
        <CancelDeliveryHeaderButton />
      </Box>
      <Space x={1} />
    </Box>
  </Fixed>
);

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
          <Button primary >
            <Box display="flex" alignItems="center">
              <Box>
                <Text bold color="white" display="block">Request</Text>
                <Box display="flex">
                  <Text size={-1} color="white">ETA for pickup:</Text>
                  <Space />
                  <Text size={-1} bold color="white">32</Text>
                  <Text size={-1} color="white">min</Text>
                </Box>
              </Box>

              <Space x={1} />
              <Text color="white" size={1}>5.90€</Text>
            </Box>
          </Button>
        </Box>
      </RequestPanel>
    );
  }

  const defaultProps = {
    center: {lat: 39.470128, lng: -0.370621},
    zoom: 16,
    greatPlaceCoords: {lat: 59.724465, lng: 30.080121},
  };

  return (
    <Container>
      <NewJobPageHeader />
      <Box paddingTop={2}>
        <Title message="Snabb - New Delivery" />
        <LeftPanel>
          <GoogleMap
            bootstrapURLKeys={{
            key: 'AIzaSyCHel-4O415Brc6BGGKhMvg-HYxuEShEWw',
            language: 'en',
          }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          />
        </LeftPanel>
        <RightPanel>
          <DeliveryFields/>
          {renderRequestButton()}
        </RightPanel>
      </Box>
    </Container>

  );
};

export default NewJobPage;
