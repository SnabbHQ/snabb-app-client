import React, {Component, PropTypes} from "react";
import {StyleSheet, Image, Text, View, Dimensions, TouchableOpacity} from "react-native";
import Geocoder from 'react-native-geocoder';

Geocoder.fallbackToGoogle('AIzaSyBodeCxWCFMML6JvWL8MW6ztpHJZBN8KTw');

const propTypes = {
  location: PropTypes.object.isRequired,
  showLabel: PropTypes.bool,
  labelText: PropTypes.string,
  defaultText: PropTypes.string,
  labelColor: PropTypes.string,
  textColor: PropTypes.string
}

const defaultProps = {
  location: {
    latitude: 0,
    longitude: 0,
    address: ''
  },
  showLabel: false,
  labelText: 'My Location',
  defaultText: 'Choose Your Location',
  labelColor: 'black',
  textColor: 'black'
}

class LocationBox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      address: ''
    }
  }

  componentWillReceiveProps(newProps) {
    var self = this

    if (newProps.location && newProps.location !== this.props.location) {
      Geocoder.geocodePosition({
          lat: this.props.location.latitude,
          lng: this.props.location.longitude
        }
      ).then(res => {
        self.setState({
          address: res[0].feature
        });
      })
        .catch(err => console.log(err));
    } else if (newProps.location && newProps.location.address != this.props.location.address) {
      this.setState({
        address: newProps.address
      });
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

LocationBox
  .propTypes = propTypes;
LocationBox
  .defaultProps = defaultProps;

export
default
LocationBox
