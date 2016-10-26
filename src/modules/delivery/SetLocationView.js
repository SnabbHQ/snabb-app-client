'use strict';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as locationActions from "../../reducers/location/locationActions";
import * as globalActions from "../../reducers/global/globalActions";
import {Actions} from "react-native-router-flux";
import React, {Component} from "react";
import {StyleSheet, Text} from "react-native";
import {View, Content} from "native-base";
import DefaultNavBar from "../../components/DefaultNavBar";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";

// TODO - Make sure this is not hardcoded but setup by the user
const homePlace = {description: 'Home', geometry: {location: {lat: 48.8152937, lng: 2.4597668}}};
const workPlace = {description: 'Work', geometry: {location: {lat: 48.8496818, lng: 2.2940881}}};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...locationActions, ...globalActions}, dispatch)
  }
}

class SetLocationView extends Component {

  handlePlacePress(data, details) {
    // 'details' is provided when fetchDetails = true
    console.log(data);
    console.log(details);

    var location = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng
    }

    this.props.actions.setPickupLocation(location)

    Actions.pop()
  }

  render() {
    return (
      <View>
        <DefaultNavBar title={this.props.title}/>
        <Content>
          <GooglePlacesAutocomplete
            placeholder='Search'
            minLength={2} // minimum length of text to search
            autoFocus={false}
            listViewDisplayed='auto'    // true/false/undefined
            fetchDetails={true}
            onPress={(data, details = null) => this.handlePlacePress(data, details)}
            getDefaultValue={() => {
              return ''; // text input default value
            }}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: 'AIzaSyBodeCxWCFMML6JvWL8MW6ztpHJZBN8KTw',
              language: 'en' // language of the results
            }}
            styles={{
              description: {
                fontWeight: 'bold'
              },
              predefinedPlacesDescription: {
                color: '#1faadb'
              }
            }}
            currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
            currentLocationLabel="Current location"
            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GooglePlacesSearchQuery={{
              // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
              rankby: 'distance'
            }}
            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

            predefinedPlaces={[homePlace, workPlace]}
          />
        </Content>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  summary: {
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default connect(null, mapDispatchToProps)(SetLocationView)


