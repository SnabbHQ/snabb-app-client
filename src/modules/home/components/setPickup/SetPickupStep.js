'use strict'

import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import * as locationActions from "../../../../reducers/location/locationActions"
import React, {Component} from "react"
import {StyleSheet, View, Dimensions} from "react-native"
import {Actions} from "react-native-router-flux"
import {Button} from "native-base"
import Icon from "react-native-vector-icons/Ionicons"
import LocationPin from "./LocationPin"
import SetPickupContainer from "./SetPickupContainer"

const {height, width} = Dimensions.get('window') // Screen dimensions in current orientation

const {
  PICKUP_LOCATION
} = require('../../../../lib/constants').default

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...locationActions}, dispatch)
  }
}

class SetPickupLocationStep extends Component {

  componentDidMount() {
    this.centerOnUser();
  }

  centerOnUser() {
    this.props.actions.getCurrentPosition()
  }

  onPickupLocationBoxPress() {
    Actions.SetLocationScreen({
      title: 'Pickup location',
      viewType: PICKUP_LOCATION
    })
  }

  onSetPickupPress() {
    // TODO
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <LocationPin
          text={""}
          pinColor={"#000"}
          textColor={"#FFF"}
          top={0}/>

        <View style={styles.content} pointerEvents={'box-none'}>
          <View style={{flexDirection: 'row'}}>
            <Button style={styles.centerOnUserButton} onPress={() => this.centerOnUser()}>
              <Icon name='ios-locate-outline' style={styles.locationIcon}/>
            </Button>
          </View>
          <View style={{backgroundColor: 'transparent', flexWrap: 'wrap', flexDirection: 'row', width: width}}>
            <SetPickupContainer
              onPickupLocationBoxPress={() => this.onPickupLocationBoxPress()}
              onSetPickupPress={() => this.onSetPickupPress()}/>
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
})

export default connect(null, mapDispatchToProps)(SetPickupLocationStep)