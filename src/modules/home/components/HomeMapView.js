'use strict'

import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import * as locationActions from "../../../reducers/location/locationActions"
import * as globalActions from "../../../reducers/global/globalActions"
import React, {Component} from "react"
import {StyleSheet, View, Dimensions} from "react-native"
import {Actions} from "react-native-router-flux"
import MapView from "react-native-maps"
import * as Defaults from "../../../reducers/location/locationConstants"
import SetPickupLocationStep from './setPickup/SetPickupLocationStep'
import RequestPickupStep from './requestDelivery/RequestPickupStep'

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

class HomeMapView extends Component {

  constructor(params) {
    super(params)

    this.state = {
      map: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: Defaults.LATITUDE_DELTA,
        longitudeDelta: Defaults.LONGITUDE_DELTA,
      },
      step: 'SET_PICKUP'
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.location.pickupLocation && newProps.location.pickupLocation !== this.props.pickupLocation
      && newProps.location.from !== 'map') {
      this.setState({
        ...this.state,
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
      ...this.state,
      map: {
        latitude: region.latitude,
        longitude: region.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta
      }
    });
  }

  onRegionChangeComplete(region) {

    // Make sure we only propagate this on the set_pickup step, otherwise when moving the map in the other
    // steps will cause the current pickup location to update.
    if (this.state.step === 'SET_PICKUP') {
      this.props.actions.setPickupLocation(region, 'map')
    }
  }

  focusMap() {
    this.map.fitToSuppliedMarkers(['pickup', 'delivery'], true);
  }

  renderStep() {
    switch (this.state.step) {
      case "SET_PICKUP":
        return <SetPickupLocationStep/>
      default:
        return <RequestPickupStep/>
    }
  }

  render() {
    var markerPickup;
    var markerDelivery;

    if (this.state.step !== 'SET_PICKUP') {
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

        {this.renderStep()}
      </View>
    )
  }
}

var styles = StyleSheet.create({
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
