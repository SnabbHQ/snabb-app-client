/* @flow */
import R from 'ramda';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {Fixed, Text, Title, Button, Space, Container, Box, Map} from '../../app/components';
import DeliveryFields from './DeliveryFields';
import NewDeliveryPageHeader from './NewDeliveryPageHeader';
import styled from '../../app/components/styled';
import { createQuote } from '../../../common/delivery/actions';

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

type NewDeliveryPageProps = {
  pickUpPlace: ?Object,
  dropOffPlace: ?Object,
}

const RequestButton = ({ quote }) => {
  return (
    <RequestPanel>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        height="100%"
        paddingRight={1}
      >
        {quote &&
          <Button primary >
            <Box display="flex" alignItems="center" >
              <Box>
                <Text bold color="white" display="block" >Request</Text>
                <Box display="flex" >
                  <Text size={-1} color="white" >ETA for pickup:</Text>
                  <Space />
                  <Text size={-1} bold color="white" >{quote.prices.big.eta}</Text>
                  <Text size={-1} color="white" >min</Text>
                </Box>
              </Box>

              <Space x={1} />
              <Text color="white" size={1} >{quote.prices.big.price}</Text>
              <Text color="white" size={1} >{quote.currency.symbol}</Text>
            </Box>
          </Button>
        }
      </Box>
    </RequestPanel>
  )
};

class NewDeliveryPage extends React.Component {


  componentWillReceiveProps({pickUpPlace, dropOffPlace}) {
    if (pickUpPlace && dropOffPlace &&
      (this.props.pickUpPlace != pickUpPlace || this.props.dropOffPlace != dropOffPlace)
    ) {
      const { createQuote } = this.props;
      createQuote({ pickUpPlace, dropOffPlace })
    }
  }

  render() {

    const { quote, pickUpPlace, dropOffPlace } = this.props;
    return (
      <Container>
        <NewDeliveryPageHeader />
        <Box paddingTop={2}>
          <Title message="Snabb - New Delivery" />
          <LeftPanel>
            <Map
              pickUpPlace={pickUpPlace}
              dropOffPlace={dropOffPlace}
            />
          </LeftPanel>
          <RightPanel>
            <DeliveryFields />
            <RequestButton
              quote={quote}
            />
          </RightPanel>
        </Box>
      </Container>
    )
  }
}

export default R.compose(
  connect(
    (state: State) => ({
      pickUpPlace: state.delivery.pickUpPlace,
      dropOffPlace: state.delivery.dropOffPlace,
      quote: state.delivery.quote,
    }),
    { createQuote },
  )
)(NewDeliveryPage);
