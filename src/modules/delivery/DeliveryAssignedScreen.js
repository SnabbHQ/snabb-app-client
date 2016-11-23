'use strict';

import React, { Component } from 'react';
import SlidingUpPanel from 'react-native-sliding-up-panel';
import MapView from "react-native-maps"
import DeliveryAssignedContainer from './DeliveryAssignedContainer'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image
} from 'react-native';

var deviceHeight = Dimensions.get('window').height;

var MAXIMUM_HEIGHT = deviceHeight - 150;
var MINIMUM_HEIGHT = 80;

class DeliveryAssignedScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      containerHeight : 0
    }
  }

  render() {
    return (
      <View style={styles.parentContainer}>
        <MapView
          ref={ref => {
            this.map = ref
          }}
          style={styles.map}>
        </MapView>

        <SlidingUpPanel
          ref={panel => { this.panel = panel }}
          containerMaximumHeight={MAXIMUM_HEIGHT}
          handlerHeight={MINIMUM_HEIGHT}
          allowStayMiddle={false}
          handlerDefaultView={<HandlerOne/>}
          getContainerHeight={this.getContainerHeight}>

          <DeliveryAssignedContainer styles={styles.frontContainer}/>
        </SlidingUpPanel>
      </View>
    )
  }

  getContainerHeight = (height) => {
    this.setState({
      containerHeight : height
    })
  }
}

class HandlerOne extends Component{
  render() {
    return (
    <View style={{flexDirection: 'row'}}>
      <Image
        style={{width: 80, height: 80}}
        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
      />
      <View style={{flexDirection: 'column'}}>
        <Text>Order Number: 12344</Text>
        <Text>Picking up in about 5 min</Text>
      </View>
    </View>
    )
  }
}

var styles = StyleSheet.create({
  parentContainer: {
    flex : 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  backContainer: {
    flex : 1,
    backgroundColor : 'blue'
  },
  frontContainer: {
    flex : 1,
  },
  logText: {
    color : 'white',
    fontWeight: '700',
  },
  panelText: {
    color : 'white',
  },
  textContainer: {
    backgroundColor : 'transparent',
    height : MINIMUM_HEIGHT,
    justifyContent : 'center'
  },
  handlerText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
  button: {
    backgroundColor : 'black',
    justifyContent : 'center',
    alignSelf : 'center',
    padding: 5
  }
})

export default DeliveryAssignedScreen
