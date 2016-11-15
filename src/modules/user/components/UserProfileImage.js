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

  constructor(params) {
    super(params)

    this.props.dropShadow = {}
  }

  getDropShadowStyle(borderRadius) {
    if (this.props.dropShadow) {
      return {
        borderRadius: borderRadius,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 0
        },
        elevation: 5
      }
    } else {
      return {}
    }
  }

  render() {
    var borderRadius = this.props.size/2 ? this.props.size /2 : 20
    let profileImage = {
      backgroundColor: '#AAA',
      borderColor: '#FFFFFF',
      borderWidth: 3,
      height: this.props.size ? this.props.size : 40,
      width: this.props.size ? this.props.size: 40,
      borderRadius: borderRadius
    }

    return (
      <View style={[styles.container, this.props.style, this.getDropShadowStyle(borderRadius)]}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Image style={profileImage} source={{uri: this.props.profile.thumbnail}}/>
        </TouchableOpacity>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default connect(mapStateToProps, null)(UserProfileImage)

