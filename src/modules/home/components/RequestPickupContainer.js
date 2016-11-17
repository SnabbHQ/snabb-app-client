'use strict'

import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import * as locationActions from "../../../reducers/location/locationActions"
import React, {Component, PropTypes} from "react"
import {Image, TouchableOpacity, StyleSheet, Platform, Dimensions} from "react-native"
import {Text, View} from "native-base"
import LocationBox from "./LocationBox"
import Swiper from "react-native-swiper"

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
        <Swiper
          height={150}
          width={Dimensions.get('window').width}
          style={styles.wrapper}
          showsButtons={false}
          showsPagination={false}>
          <View style={styles.slide1}>
            <Text style={styles.text}>Small</Text>
            <Text>Hello Swiper</Text>
          </View>
          <View style={styles.slide2}>
            <Text style={styles.text}>Medium</Text>
            <Text>Hello Swiper</Text>
          </View>
          <View style={styles.slide3}>
            <Text style={styles.text}>Big</Text>
            <Text>Hello Swiper</Text>
          </View>
        </Swiper>
        <LocationBox
          address={this.props.location.pickupLocation.address}
          margin={10}
          showLabel={true}
          labelText={"PICKUP LOCATION"}
          defaultText={"Choose Location"}
          labelColor={"rgba(113,187,28,1)"}
          textColor={"rgba(0,0,0,1)"}
          onPress={this.props.onPickupLocationBoxPress}/>

        <LocationBox
          address={this.props.location.deliveryLocation.address}
          margin={10}
          showLabel={true}
          labelText={"DELIVERY LOCATION"}
          defaultText={"Choose Location"}
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
    shadowRadius: 4,
    shadowOpacity: 0.2,
    shadowColor: '#000',
    flexWrap: 'wrap',
    flex: 1,
    height: 320
  },
  setPickupLocation: {
    backgroundColor: '#31445d',
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
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  text: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestPickupContainer)
