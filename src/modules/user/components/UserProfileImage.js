import {Image, View, StyleSheet, TouchableOpacity} from "react-native";
import React, {Component} from 'react';


class UserProfileImage extends Component {

  constructor(param) {
    super(param)

  }

  render() {
    let profileImage = {
      backgroundColor: '#AAA',
      borderColor: '#FFFFFF',
      borderWidth: 3,
      height: this.props.size ? this.props.size : 40,
      width: this.props.size ? this.props.size: 40,
      borderRadius: this.props.size/2 ? this.props.size /2 : 20
    }

    return (
      <View style={[styles.container, this.props.style]}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Image style={profileImage} source={this.props.source}/>
        </TouchableOpacity>
      </View>
    )
  }

// <Image style={profileImage} source={{uri: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTlovN715rKGVOscWvovnblMwpvwMlknTosSXthVP9xLlW7KCfw"}}/>
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default UserProfileImage;
