'use strict';

import React from "react";
import {StyleSheet, View, Text, Dimensions, TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import {Actions} from "react-native-router-flux";
import {Button, Grid, Row} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import MapView from "react-native-maps";
import LocationPin from "./LocationPin";
import LocationSearchbox from "./../components/LocationSearchbox";
// import Icon from "react-native-vector-icons/MaterialIcons";

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
            latitude: position.coords.latitude + LATITUDE_OFFSET,
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
          region={this.state.region}
          onRegionChangeComplete={region => this.onRegionChange(region)}/>

        <LocationPin
          text={"SET LOCATION"}
          pinColor={"#000"}
          textColor={"#FFF"}
          top={-100}/>

        <View style={styles.content} pointerEvents={'box-none'}>
          <View>
            <Button style={styles.centerOnUserButton} onPress={() => this.centerOnUser()}>
              <Icon name='location-arrow' style={styles.locationIcon}/>
            </Button>
          </View>

          <View style={styles.locationPanel}>
            <Grid>
              <Row>
                <LocationSearchbox
                  latlng={{lat: this.state.region.latitude, lng: this.state.region.longitude}}
                  margin={10}
                  showLabel={true}
                  labelText={"MY LOCATION"}
                  defaultText={"Choose Your Location"}
                  labelColor={"rgba(113,187,28,1)"}
                  textColor={"rgba(0,0,0,1)"}
                  onPress={() => this.handlePickupLocationPress()}/>
              </Row>
              <Row>
                <TouchableOpacity style={styles.setPickupLocation}>
                  <Text style={styles.setPickupLocationText}>Set Pickup</Text>
                </TouchableOpacity>
              </Row>
            </Grid>
          </View>
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
  },
  locationPanel: {
    flexDirection: 'row',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#F7F7F7',
    shadowRadius: 2,
    shadowOpacity: 0.2,
    shadowColor: '#000',
    height: 130
  },
  setPickupLocation: {
    backgroundColor: '#00D5D5',
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

module.exports = DisplayLatLng;
