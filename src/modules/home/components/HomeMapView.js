'use strict';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as locationActions from "../../../reducers/location/locationActions";
import * as globalActions from "../../../reducers/global/globalActions";
import React, {Component} from "react";
import {StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import {Actions} from "react-native-router-flux";
import {Button} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import MapView from "react-native-maps";
import LocationPin from "./LocationPin";
import SetPickupContainer from "./SetPickupContainer"
import RequestPickupContainer from "./RequestPickupContainer"
import * as Defaults from '../../../reducers/location/locationConstants'
import SelectTransportContainer from "./SelectTransportContainer"


import Dimensions from 'Dimensions';
var {height, width} = Dimensions.get('window') // Screen dimensions in current orientation

const {
  PICKUP_LOCATION,
  DELIVERY_LOCATION
} = require('../../../lib/constants').default

/**
 * ## Redux boilerplate
 */
function mapStateToProps(state) {
  return {
    location: state.location
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...locationActions, ...globalActions}, dispatch)
  }
}

let showPickup = true;

class HomeMapView extends Component {


  constructor(params) {
    super(params)

    this.state = {
      currentLocation: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: Defaults.LATITUDE_DELTA,
        longitudeDelta: Defaults.LONGITUDE_DELTA
      },
      pickupLocation: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      }
    }
  }

  componentDidMount() {
    this.centerOnUser();
  }

  componentWillReceiveProps(props) {
    this.setState({
      currentLocation: {
        latitude: props.location.pickupLocation.latitude,
        longitude: props.location.pickupLocation.longitude,
        latitudeDelta: props.location.pickupLocation.latitudeDelta || Defaults.LATITUDE_DELTA,
        longitudeDelta: props.location.pickupLocation.longitudeDelta || Defaults.LONGITUDE_DELTA
      },
      pickupLocation: {
        latitude: props.location.pickupLocation.latitude,
        longitude: props.location.pickupLocation.longitude,
        latitudeDelta: props.location.pickupLocation.latitudeDelta || Defaults.LATITUDE_DELTA,
        longitudeDelta: props.location.pickupLocation.longitudeDelta || Defaults.LONGITUDE_DELTA
      }
    })
  }

  centerOnUser() {
    this.props.actions.getCurrentPosition()
  }

  onRegionChange(region) {
    this.setState({currentLocation: region});
  }

  onRegionChangeComplete(region) {
    this.props.actions.setPickupLocation(region)
  }

  onPickupLocationBoxPress() {
    Actions.SetLocationScreen({
      title: 'Pickup location',
      viewType: PICKUP_LOCATION
    })
  }

  onDeliveryLocationBoxPress() {
    Actions.SetLocationScreen({
      title: 'Delivery location',
      viewType: DELIVERY_LOCATION
    })
  }

  onSetPickupPress() {
    showPickup = false
    this.forceUpdate()
  }

  onRequestPickupButtonPress() {
    //Actions.RequestingPickupScreen()
    showPickup = false
    this.forceUpdate()
  }

  handleBackToSetPickupPress() {
    showPickup = true
    this.forceUpdate()
  }

  renderBackButton() {
    if (!showPickup) {
      return (
        <Button style={styles.backToSetPickup} onPress={() => this.handleBackToSetPickupPress()}>
          <Icon name='arrow-left' style={styles.locationIcon}/>
        </Button>
      )
    } else {
      return null
    }
  }

  showWhat() {
    if (showPickup) {
      return <SetPickupContainer
        onPickupLocationBoxPress={() => this.onPickupLocationBoxPress()}
        onSetPickupPress={() => this.onSetPickupPress()}/>
    } else {
      return <RequestPickupContainer
        onPickupLocationBoxPress={() => this.onPickupLocationBoxPress()}
        onDeliveryLocationBoxPress={() => this.onDeliveryLocationBoxPress()}
        onRequestPickupButtonPress={() => this.onRequestPickupButtonPress()}/>
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref={ref => {
            this.map = ref;
          }}
          style={styles.map}
          showsUserLocation={true}
          region={this.state.currentLocation}
          onRegionChange={region => this.onRegionChange(region)}
          onRegionChangeComplete={region => this.onRegionChangeComplete(region)}/>

        <LocationPin
          text={""}
          pinColor={"#000"}
          textColor={"#FFF"}
          top={0}/>

        <View style={styles.content} pointerEvents={'box-none'}>
          <View style={{flexDirection: 'row'}}>
            {this.renderBackButton()}
            <Button style={styles.centerOnUserButton} onPress={() => this.centerOnUser()}>
              <Icon name='location-arrow' style={styles.locationIcon}/>
            </Button>
          </View>
          <View style={{backgroundColor: 'transparent', flexWrap: 'wrap', flexDirection: 'row', width: width}}>
            {this.showWhat()}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  backToSetPickup: {
    marginRight: 30,
    marginBottom: 15,
    height: 36,
    width: 36,
    backgroundColor: '#F7F7F7'
  },
  centerOnUserButton: {
    marginRight: 15,
    marginBottom: 15,
    height: 36,
    width: 36,
    backgroundColor: '#F7F7F7'
  },
  locationIcon: {
    fontSize: 20,
    color: '#007AFF'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeMapView)
