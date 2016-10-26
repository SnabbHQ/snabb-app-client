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

class HomeMapView extends React.Component {

  componentDidMount() {
    this.centerOnUser();
  }

  centerOnUser() {
    this.props.actions.getCurrentPosition()
  }

  onRegionChange(region) {
    this.props.actions.setPickupLocation(region)
  }

  handlePickupLocationPress() {
    Actions.SetLocationScene({
      title: 'Pickup location'
      // you can add additional props to be passed to view here...
    })
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
          text={"SET LOCATION"}
          pinColor={"#000"}
          textColor={"#FFF"}
          top={0}/>

        <View style={styles.content} pointerEvents={'box-none'}>
          <View>
            <Button style={styles.centerOnUserButton} onPress={() => this.centerOnUser()}>
              <Icon name='location-arrow' style={styles.locationIcon}/>
            </Button>
          </View>
          <SetPickupContainer/>
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
