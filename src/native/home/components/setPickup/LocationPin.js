import React from 'react';
import { Text, View, Dimensions, TouchableOpacity } from 'react-native';

class LocationPin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const backgroundColor = this.props.pinColor || 'rgba(0,154,255,1)';
    const screenStyle = {
      height: 0,
      width: 0,
      top: 0,
      left: 0,
      position: 'absolute',
      overflow: 'visible',
    };

    const innerStyle = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    };
    const top = -19 + Dimensions.get('window').height / 2 + (this.props.top || 0);
    const left = (this.props.left || 0);
    const style = {
      borderRadius: 21,
      backgroundColor,
      left: this.props.left || left,
      top: this.props.top || top,
      height: 41,
    };

    const textStyle = {
      fontSize: 20,
      color: this.props.textColor || 'white',
      backgroundColor: 'transparent',
      paddingVertical: 8,
      paddingHorizontal: 21,
      fontWeight: '300',
    };

    const nubStyle = {
      width: 3,
      height: 20,
      backgroundColor,
      left: this.props.left || left,
      top: this.props.top || top,
    };

    return (
      <View style={screenStyle} pointerEvents={'box-none'}>
        <View style={innerStyle} pointerEvents={'box-none'}>
          <TouchableOpacity
            style={style}
            onPress={this.props.onPress}
            activeOpacity={75 / 100}
          >
            <Text style={textStyle}>{this.props.text || ''}</Text>
          </TouchableOpacity>
          <View style={nubStyle} />
        </View>
      </View>
    );
  }
}

export default LocationPin;
