'use strict';

import React from "react";
import {StyleSheet, View, Text, Dimensions, TouchableOpacity} from "react-native";
import {Button} from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome";
import MapView from "react-native-maps";
import LocationPin from './LocationPin'

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 39.4699; // Valencia as default
const LONGITUDE = 0.3763;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const LATITUDE_OFFSET = -0.002;

class DisplayLatLng extends React.Component {

  state = {
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }
  };

  componentDidMount() {
    this.centerOnUser();

    this.watchID = navigator.geolocation.watchPosition((position) => {
      const newRegion = {
        latitude: position.coords.latitude + LATITUDE_OFFSET, //Little margin here to adjust the user pos marker a bit higher
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      };

      this.onRegionChange(newRegion);
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onRegionChange(region) {
    this.setState({region});
  }

  centerOnUser() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.map.animateToRegion({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }
        });
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref={ref => { this.map = ref; }}
          style={styles.map}
          showsUserLocation={true}
          region={this.state.region}
          onRegionChange={region => this.onRegionChange(region)}/>

        <View>
          <Button style={styles.centerOnUserButton} onPress={() => this.centerOnUser()}>
            <Icon name='location-arrow' style={styles.locationIcon}/>
          </Button>
        </View>
      </View>
    );
  }
}

// <LocationPin
//   text={"SET LOCATION"}
//   pinColor={"#000"}
//   textColor={"#FFF"}
//   top={0}
//   left={0}
// />

// <View style={[styles.bubble, styles.latlng]}>
//   <Text style={{ textAlign: 'center' }}>
//     {this.state.region.latitude.toPrecision(7)},
//     {this.state.region.longitude.toPrecision(7)}
//   </Text>
// </View>

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  centerOnUserButton: {
    marginRight: 15,
    marginBottom: 170 + 15, // TODO - 170 corresponds to the height of the panel
    height: 36,
    width: 36,
    backgroundColor: '#F7F7F7'
  },
  locationIcon: {
    fontSize: 20,
    color: '#007AFF'
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: 'stretch'
  }
});

module.exports = DisplayLatLng;
