/* @flow */
import R from 'ramda';
import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import {Fixed, Text, Button, Space, Image, Box } from '../../app/components';
import {FormattedMessage} from 'react-intl';
import buttonsMessages from '../../../common/app/buttonsMessages';
import jobMessages from '../../../common/delivery/jobMessages';

// $FlowFixMe
const logo = require('../../../common/app/images/logo.svg');

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

const NewDeliveryPageHeader = () => (
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

export default R.compose(
  connect(
    (state: State) => ({
      pickupPlace: state.delivery.pickupPlace,
      dropoffPlace: state.delivery.dropoffPlace,
      quote: state.delivery.quote,
    })
  )
)(NewDeliveryPageHeader);
