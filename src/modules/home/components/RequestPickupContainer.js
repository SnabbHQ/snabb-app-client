'use strict'

import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import * as locationActions from "../../../reducers/location/locationActions"
import React, {Component, PropTypes} from "react"
import {Image, TouchableOpacity, StyleSheet, Platform, Dimensions} from "react-native"
import {Text, View} from "native-base"
import LocationBox from "./LocationBox"

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
    actions: bindActionCreators({...locationActions}, dispatch)
  }
}

const propTypes = {
  onPickupLocationBoxPress: PropTypes.func,
  onDeliveryLocationBoxPress: PropTypes.func,
}

class RequestPickupContainer extends Component {

  render() {
    return (
      <View style={styles.requestPickupContainer}>
        <LocationBox
          latlng={{
            lat: this.props.location.pickupLocation.latitude,
            lng: this.props.location.pickupLocation.longitude
          }}
          margin={10}
          showLabel={true}
          labelText={"Pickup Location"}
          defaultText={"Choose Your Location"}
          labelColor={"rgba(113,187,28,1)"}
          textColor={"rgba(0,0,0,1)"}
          onPress={this.props.onPickupLocationBoxPress}/>

        <LocationBox
          latlng={{
            lat: this.props.location.deliveryLocation.latitude,
            lng: this.props.location.deliveryLocation.longitude
          }}
          margin={10}
          showLabel={true}
          labelText={"Delivery Location"}
          defaultText={"Choose Your Location"}
          labelColor={"rgba(113,187,28,1)"}
          textColor={"rgba(0,0,0,1)"}
          onPress={this.props.onDeliveryLocationBoxPress}/>

        <TouchableOpacity style={styles.setPickupLocation} onPress={this.props.onRequestPickupButtonPress}>
          <Text style={styles.setPickupLocationText}>Set Pickup</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

RequestPickupContainer.propTypes = propTypes;

const styles = StyleSheet.create({
  requestPickupContainer: {
    flexDirection: 'column',
    backgroundColor: '#F7F7F7',
    shadowRadius: 2,
    shadowOpacity: 0.2,
    shadowColor: '#000',
    flexWrap: 'wrap',
    flex: 1,
    height: 200
  },
  setPickupLocation: {
    backgroundColor: '#313335',
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 5,
    alignItems: "center",
    justifyContent: 'center'
  },
  setPickupLocationText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestPickupContainer)
