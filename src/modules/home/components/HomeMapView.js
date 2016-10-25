'use strict';

import React from "react";
import {StyleSheet, View, Text, Dimensions, TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import {Button, Grid, Row, Col} from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome";
import MapView from "react-native-maps";
import LocationPin from './LocationPin'
// import Icon from "react-native-vector-icons/MaterialIcons";
import LocationSearchbox from './../components/LocationSearchbox';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 39.4699; // Valencia as default
const LONGITUDE = 0.3763;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const LATITUDE_OFFSET = -0.0015;

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

  handlePickUpPress() {
    Actions.SetLocationScene({
      title: 'Pick-Up'
      // you can add additional props to be passed to view here...
    })
  }

  handleDropOffPress() {
    Actions.SetLocationScene({
      title: 'Drop-Off'
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
          region={this.state.region}
          onRegionChange={region => this.onRegionChange(region)}/>

        <LocationPin
          text={"SET LOCATION"}
          pinColor={"#000"}
          textColor={"#FFF"}
          top={-100}/>

        <View style={{...StyleSheet.absoluteFillObject, justifyContent: 'flex-end', alignItems: 'flex-end'}}
              pointerEvents={'box-none'}>
          <View>
            <Button style={styles.centerOnUserButton} onPress={() => this.centerOnUser()}>
              <Icon name='location-arrow' style={styles.locationIcon}/>
            </Button>
          </View>

          <View style={{flexDirection: 'row', backgroundColor: '#F7F7F7', height: 130}}>
            <Grid>
              <Row>
                <LocationSearchbox
                  latlng={{lat: this.state.region.latitude, lng: this.state.region.longitude}}
                  margin={10}
                  showLabel={true}
                  labelText={"MY LOCATION"}
                  defaultText={"Choose Your Location"}
                  labelColor={"rgba(113,187,28,1)"}
                  textColor={"rgba(0,0,0,1)"}/>
              </Row>
              <Row>
                <TouchableOpacity
                  style={{backgroundColor: '#00D5D5', flex: 1, marginLeft: 10, marginRight: 10, marginBottom: 10, marginTop: 5, alignItems:"center", justifyContent: 'center'}}>
                  <Text style={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 18}}>Request Pickup</Text>
                </TouchableOpacity>
              </Row>
            </Grid>
          </View>
        </View>
      </View>
    );
  }
}

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
    marginBottom: 15,
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
