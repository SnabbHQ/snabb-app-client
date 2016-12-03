'use strict';

import React, {Component} from "react"
import {connect} from "react-redux"
import {Actions} from "react-native-router-flux";
import SlidingUpPanel from "react-native-sliding-up-panel"
import MapView from "react-native-maps"
import DeliveryAssignedContainer from "./DeliveryAssignedContainer"
import * as Defaults from "../../../common/location/locationConstants"
import {StyleSheet, View, Dimensions, Image, TouchableHighlight} from "react-native"
import {Grid, Text, Col, Button, Row, Icon} from 'native-base'

const deviceHeight = Dimensions.get('window').height
const MAXIMUM_HEIGHT = deviceHeight - 150
const MINIMUM_HEIGHT = 80
const timeout = 2000;

let animationTimeout

function mapStateToProps(state) {
  return {
    location: state.location
  }
}

class DeliveryAssignedScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      containerHeight: 0
    }
  }

  componentDidMount() {
    animationTimeout = setTimeout(() => {
      this.focusMap()
    }, timeout)
  }

  componentWillUnmount() {
    if (animationTimeout) {
      clearTimeout(animationTimeout)
    }
  }

  onRequestAnotherDeliveryPress() {
    Actions.HomeScreen()
  }

  focusMap() {
    this.map.fitToSuppliedMarkers(['pickup', 'delivery'], true)
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

        <Button
          primary
          block
          style=
            {{
              marginTop: 30, margin: 10
            }}
          onPress={this.onRequestAnotherDeliveryPress.bind(this)}>Request another delivery</Button>
        <SlidingUpPanel
          ref={panel => {
            this.panel = panel
          }}
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
      containerHeight: height
    })
  }
}

class HandlerOne extends Component {
  render() {
    return (
      <Grid style={{
        flex: 1,
        shadowRadius: 4,
        shadowOpacity: 0.2,
        shadowColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
      }}>
        <Image
          style={{width: 60, height: 60, borderRadius: 30}}
          source={{uri: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQJNtdspFBnm_n6ugwDkCJ_nqiRlnxhryy9s7lA5eJ4ztKVpJiF'}}
        />
        <Col style={{marginLeft: 5, padding: 5, flex: 4}}>
          <Row>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Order #12344</Text>
          </Row>
          <Row>
            <Text style={{fontSize: 13}}>ETA of 5 min - 4km</Text>
          </Row>
        </Col>
        <Col style={{marginRight: 5, alignItems: 'flex-end'}}>
          <TouchableHighlight onPress={() => {
          }}>
            <View>
              <Icon style={{padding: 10, fontSize: 40}} name='ios-call-outline'/>
            </View>
          </TouchableHighlight>

        </Col>
      </Grid>
    )
  }
}

var styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  backContainer: {
    flex: 1,
    backgroundColor: 'blue'
  },
  frontContainer: {
    flex: 1,
  },
  logText: {
    color: 'white',
    fontWeight: '700',
  },
  panelText: {
    color: 'white',
  },
  textContainer: {
    backgroundColor: 'transparent',
    height: MINIMUM_HEIGHT,
    justifyContent: 'center'
  },
  handlerText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
  button: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 5
  }
})

export default connect(mapStateToProps, null)(DeliveryAssignedScreen)
