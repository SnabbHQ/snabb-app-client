'use strict'

import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import React, {Component} from "react"
import * as deliveryActions from "../../../../reducers/delivery/deliveryActions"
import {StyleSheet, View, Dimensions} from "react-native"
import {Actions} from "react-native-router-flux"
import {Button} from "native-base"
import Icon from "react-native-vector-icons/Ionicons"
import RequestPickupContainer from "./RequestPickupContainer"

var {height, width} = Dimensions.get('window') // Screen dimensions in current orientation

const {
  PICKUP_LOCATION,
  DELIVERY_LOCATION
} = require('../../.././constants').default

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...deliveryActions}, dispatch)
  }
}

class RequestPickupStep extends Component {

  centerOnUser() {
    this.props.actions.getCurrentPosition()
  }

  onBackPress() {
    this.props.actions.goToSetPickup()
  }

  onRequestPickupButtonPress() {
    Actions.RequestingPickupModal()
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
      <View pointerEvents={'box-none'} style={styles.content}>
        <View style={{
          flexDirection: 'row'
        }}>
          <View pointerEvents={'box-none'} style={{
            justifyContent: 'space-between',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-end'
          }}>
            <Button style={styles.backToSetPickup} onPress={() => this.onBackPress()}>
              <Icon name='ios-arrow-round-back' style={styles.backIcon}/>
            </Button>
            <Button style={styles.centerOnUserButton} onPress={() => this.centerOnUser()}>
              <Icon name='ios-locate-outline' style={styles.locationIcon}/>
            </Button>
          </View>
        </View>
        <View style={{backgroundColor: 'transparent', flexWrap: 'wrap', flexDirection: 'row', width: width}}>
          <RequestPickupContainer
            onPickupLocationBoxPress={() => this.onPickupLocationBoxPress()}
            onDeliveryLocationBoxPress={() => this.onDeliveryLocationBoxPress()}
            onRequestPickupButtonPress={() => this.onRequestPickupButtonPress()}/>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end'
  },
  backToSetPickup: {
    margin: 15,
    height: 36,
    width: 36,
    backgroundColor: '#F7F7F7'
  },
  centerOnUserButton: {
    margin: 15,
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

export default connect(null, mapDispatchToProps)(RequestPickupStep)