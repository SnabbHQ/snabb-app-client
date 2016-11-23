import React, {Component, PropTypes} from "react";
import {StyleSheet, Image, Text, View, Dimensions, TouchableOpacity} from "react-native";


const propTypes = {
  margin: PropTypes.number,
  address: PropTypes.string,
  showLabel: PropTypes.bool,
  labelText: PropTypes.string,
  defaultText: PropTypes.string,
  labelColor: PropTypes.string,
  textColor: PropTypes.string,
  iconColor: PropTypes.string,

  /**
   * Callback that is called as soon as we have geocode the position
   */
  onAddressChange: PropTypes.func,
}

const defaultProps = {
  margin: 0,
  address: '',
  showLabel: false,
  labelText: 'My Location',
  defaultText: 'Choose Your Location',
  labelColor: 'black',
  textColor: 'black',
  iconColor: 'pink'
}

class LocationBox extends Component {

  render() {
    let style = {
      flex: 1,
      margin: this.props.margin
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

    let iconSize = 16;
    let iconStyle = {
      width: iconSize,
      height: iconSize,
      backgroundColor: this.props.iconColor,
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
            <View style={iconStyle}/>
            <View style={searchboxTextContainerStyle}>
              {this.props.showLabel && <Text style={labelStyle}>{this.props.labelText}</Text>}
              <Text style={textStyle}>{this.props.address || this.props.defaultText}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

LocationBox.propTypes = propTypes;
LocationBox.defaultProps = defaultProps;

export default LocationBox
