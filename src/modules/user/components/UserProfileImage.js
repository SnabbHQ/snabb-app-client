import {connect} from "react-redux"
import {Image, View, StyleSheet, TouchableOpacity} from "react-native";
import React, {Component} from 'react';

/**
 * ## Redux boilerplate
 */
function mapStateToProps(state) {
  return {
    profile: {
      thumbnail: state.profile.form.fields.thumbnail,
    }
  }
}

class UserProfileImage extends Component {

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
          <Image style={profileImage} source={{uri: this.props.profile.thumbnail}}/>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default connect(mapStateToProps, null)(UserProfileImage)

