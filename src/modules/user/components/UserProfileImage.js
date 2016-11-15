import {Image, View, StyleSheet, TouchableOpacity} from "react-native";
import React, {Component} from 'react';


class UserProfileImage extends Component {

  constructor(param) {
    super(param)

    this.props.style = {}
  }

  render() {
    let profileImage = {
      backgroundColor: '#AAA',
      borderColor: '#FFFFFF',
      borderWidth: 3,
      height: this.props.style.height ? this.props.style.height : 40,
      width: this.props.style.width ? this.props.style.width : 40,
      borderRadius: this.props.style.borderRadius ? this.props.style.borderRadius : 20
    }

    return (
      <View style={this.props.style}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Image style={profileImage}/>
        </TouchableOpacity>
      </View>
    )
  }
}

export default UserProfileImage;
