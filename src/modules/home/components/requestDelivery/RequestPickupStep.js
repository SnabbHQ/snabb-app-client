'use strict'

import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import React, {Component} from "react"
import {StyleSheet, View, Dimensions} from "react-native"
import {Actions} from "react-native-router-flux"
import {Button} from "native-base"
import Icon from "react-native-vector-icons/Ionicons"
import RequestPickupContainer from "./RequestPickupContainer"

var {height, width} = Dimensions.get('window') // Screen dimensions in current orientation

const {
  PICKUP_LOCATION,
  DELIVERY_LOCATION
} = require('../../../../lib/constants').default

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

export default connect(null, null)(RequestPickupStep)