'use strict';

import React, {Component} from "react"
import {connect} from "react-redux"
import SlidingUpPanel from "react-native-sliding-up-panel"
import MapView from "react-native-maps"
import DeliveryAssignedContainer from "./DeliveryAssignedContainer"
import * as Defaults from "../../reducers/location/locationConstants"
import {StyleSheet, Text, View, Dimensions, Image} from "react-native"

const deviceHeight = Dimensions.get('window').height
const MAXIMUM_HEIGHT = deviceHeight - 150
const MINIMUM_HEIGHT = 80
const timeout = 4000;

let animationTimeout

function mapStateToProps(state) {
  return {
    location: state.location
  }
}

class DeliveryAssignedScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      containerHeight : 0
    }
  }

  componentDidMount() {
    animationTimeout = setTimeout(() => {
      this.focusMap();
    }, timeout);
  }

  componentWillUnmount() {
    if (animationTimeout) {
      clearTimeout(animationTimeout);
    }
  }

  focusMap() {
    this.map.fitToSuppliedMarkers(['pickup', 'delivery'], true);
  }

  render() {
    return (
      <View style={styles.parentContainer}>
        <MapView
          ref={ref => {
            this.map = ref
          }}
          initialRegion={{
            latitude: this.props.location.pickupLocation.latitude,
            longitude: this.props.location.pickupLocation.longitude,
            latitudeDelta: Defaults.LATITUDE_DELTA,
            longitudeDelta: Defaults.LONGITUDE_DELTA,
          }}
          style={styles.map}>

          <MapView.Marker identifier='pickup' coordinate={this.props.location.pickupLocation}/>
          <MapView.Marker identifier='delivery' coordinate={this.props.location.deliveryLocation}/>

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

export default connect(mapStateToProps, null)(DeliveryAssignedScreen)
