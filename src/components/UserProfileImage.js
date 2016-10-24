import {Image, View, StyleSheet, TouchableOpacity} from "react-native";
import React from 'react';


class UserProfileImage extends React.Component {
  render() {
    return (
      <View style={this.props.style}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Image style={styles.profileImage}/>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  profileImage: {
    backgroundColor: '#000000',
    borderColor: '#FFFFFF',
    borderWidth: 2,
    height: 40,
    borderRadius: 20,
    width: 40
  }
});

export default UserProfileImage;
