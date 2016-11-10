'use strict';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as locationActions from "../../../reducers/location/locationActions";
import * as globalActions from "../../../reducers/global/globalActions";
import React from "react";
import {StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import {Actions} from "react-native-router-flux";
import {Button} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import MapView from "react-native-maps";
import LocationPin from "./LocationPin";
import SetPickupContainer from "./SetPickupContainer"
import RequestPickupContainer from "./RequestPickupContainer"


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

class HomeMapView extends React.Component {

  componentDidMount() {
    this.centerOnUser();
  }

  centerOnUser() {
    this.props.actions.getCurrentPosition()
  }

  onRegionChange(region) {
    if (showPickup) {
      this.props.actions.setPickupLocation(region)
    }
  }

  handlePickupLocationBoxPress() {
    Actions.SetLocationScreen({
      title: 'Pickup location',
      viewType: PICKUP_LOCATION
    })
  }

  handleDeliveryLocationBoxPress() {
    Actions.SetLocationScreen({
      title: 'Delivery location',
      viewType: DELIVERY_LOCATION
    })
  }

  handleSetPickupPress() {
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
        onLocationBoxPress={() => this.handlePickupLocationBoxPress()}
        onSetPickupPress={() => this.handleSetPickupPress()}/>
    } else {
      return <RequestPickupContainer
        pickupLocationBoxPress={() => this.handlePickupLocationBoxPress()}
        deliveryLocationBoxPress={() => this.handleDeliveryLocationBoxPress()} />
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref={ref => { this.map = ref; }}
          style={styles.map}
          showsUserLocation={true}
          region={this.props.location.pickupLocation}
          onRegionChangeComplete={region => this.onRegionChange(region)}/>

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
          {this.showWhat()}
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
