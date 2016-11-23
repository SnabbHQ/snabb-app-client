'use strict'

import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import * as locationActions from "../../../reducers/location/locationActions"
import * as globalActions from "../../../reducers/global/globalActions"
import React, {Component} from "react"
import {StyleSheet, View, Dimensions} from "react-native"
import {Actions} from "react-native-router-flux"
import {Button} from "native-base"
import Icon from "react-native-vector-icons/Ionicons"
import MapView from "react-native-maps"
import RequestPickupContainer from "./RequestPickupContainer"
import * as Defaults from "../../../reducers/location/locationConstants"
import SetPickupLocationStep from './setPickup/SetPickupStep'

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
    location: state.location,
    step: 'SET_PICKUP'
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...locationActions, ...globalActions}, dispatch)
  }
}

class HomeMapView extends Component {

  constructor(params) {
    super(params)

    this.state = {
      map: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: Defaults.LATITUDE_DELTA,
        longitudeDelta: Defaults.LONGITUDE_DELTA,
      }
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.location.pickupLocation && newProps.location.pickupLocation !== this.props.pickupLocation
      && newProps.location.from !== 'map') {
      this.setState({
        map: {
          ...this.state.map,
          latitude: newProps.location.pickupLocation.latitude,
          longitude: newProps.location.pickupLocation.longitude
        }
      })
    }
  }

  onRegionChange(region) {
    this.setState({
      map: {
        latitude: region.latitude,
        longitude: region.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta
      }
    });
  }

  onRegionChangeComplete(region) {
    if (this.props.step == 'SET_PICKUP') {
      this.props.actions.setPickupLocation(region, 'map')
    }
  }

  focusMap() {
    this.map.fitToSuppliedMarkers(['pickup', 'delivery'], true);
  }

  render() {
    var markerPickup;
    var markerDelivery;

    if (this.props.step !== 'SET_PICKUP') {
      markerPickup = <MapView.Marker identifier='pickup' coordinate={this.props.location.pickupLocation}/>
      markerDelivery = <MapView.Marker identifier='delivery' coordinate={this.props.location.deliveryLocation}/>
    }

    return (
      <View style={styles.container}>
        <MapView
          ref={ref => {
            this.map = ref
          }}
          style={styles.map}
          showsUserLocation={true}
          region={{
            latitude: this.state.map.latitude,
            longitude: this.state.map.longitude,
            latitudeDelta: this.state.map.latitudeDelta,
            longitudeDelta: this.state.map.longitudeDelta,
          }}
          onRegionChange={region => this.onRegionChange(region)}
          onRegionChangeComplete={region => this.onRegionChangeComplete(region)}>

          {markerPickup}
          {markerDelivery}
        </MapView>

        <SetPickupLocationStep/>
      </View>
    )
  }
}

class RequestPickupStep extends Component {

  handleBackToSetPickupPress() {
    //TODO
  }

  onRequestPickupButtonPress() {
    //TODO
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

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.content} pointerEvents={'box-none'}>
          <View style={{flexDirection: 'row'}}>
            <Button style={styles.backToSetPickup} onPress={() => this.handleBackToSetPickupPress()}>
              <Icon name='ios-arrow-round-back' style={styles.backIcon}/>
            </Button>
            <Button style={styles.centerOnUserButton} onPress={() => this.centerOnUser()}>
              <Icon name='ios-locate-outline' style={styles.locationIcon}/>
            </Button>
          </View>
          <View style={{backgroundColor: 'transparent', flexWrap: 'wrap', flexDirection: 'row', width: width}}>
            <RequestPickupContainer
              onPickupLocationBoxPress={() => this.onPickupLocationBoxPress()}
              onDeliveryLocationBoxPress={() => this.onDeliveryLocationBoxPress()}
              onRequestPickupButtonPress={() => this.onRequestPickupButtonPress()}/>
          </View>
        </View>
      </View>
    )
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
  backIcon: {
    fontSize: 30,
    color: '#31445d'
  },
  locationIcon: {
    fontSize: 23,
    color: '#31445d'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeMapView)
