import React from "react";
import {StyleSheet, Image, Text, View, Dimensions, TouchableOpacity} from "react-native";
import Geocoder from 'react-native-geocoder';

Geocoder.fallbackToGoogle('AIzaSyBodeCxWCFMML6JvWL8MW6ztpHJZBN8KTw');

class LocationBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillReceiveProps(newProps) {
    if (newProps.latlng && newProps.latlng !== this.props.latlng) {
      Geocoder.geocodePosition(newProps.latlng)
        .then(res => {
          console.log(res[0]);

          this.setState({
            address: res[0].streetName + ", " + res[0].streetNumber
          });
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    let style = {
      flex: 1,
      margin: this.props.margin || 0
    };

    let searchboxStyle = {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: "rgba(225,225,225,1)",
      borderRadius: 4,
      height: 50
    };

    let searchboxInnerStyle = {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10
    };

    let searchboxTextContainerStyle = {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    };

    let iconURL = 'https://api.icons8.com/download/19343120d27c16dd3e9d21ad3aa637f94fd4d5fa/Android_L/PNG/256/Very_Basic/search-256.png'
    let iconSize = 16;
    let iconStyle = {
      width: iconSize,
      height: iconSize,
      opacity: 32 / 100
    };

    let labelStyle = {
      fontSize: 9,
      color: this.props.labelColor,
      marginTop: 2,
      marginBottom: 3,
      fontWeight: "600"
    };

    let textStyle = {
      fontSize: 14,
      color: this.props.textColor
    };

    return (
      <TouchableOpacity style={[style, this.props.style]} onPress={this.props.onPress}>
        <View style={searchboxStyle}>
          <View style={searchboxInnerStyle}>
            <Image source={{uri: iconURL}}
                   style={iconStyle}/>
            <View style={searchboxTextContainerStyle}>
              {this.props.showLabel && <Text style={labelStyle}>{this.props.labelText}</Text>}
              <Text style={textStyle}>{this.state.address || this.props.defaultText}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
export default LocationBox
