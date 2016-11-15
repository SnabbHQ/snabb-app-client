/**
 * # Profile.js
 *
 * This component provides an interface for a logged in user to change
 * their email.
 * It too is a container so there is boilerplate from Redux similar to
 * ```App``` and ```Login```
 */
'use strict';

import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {Content, Button} from "native-base"
import * as profileActions from "../../reducers/user/profile/profileActions"
import * as globalActions from "../../reducers/global/globalActions"
import * as authActions from "../../reducers/user/auth/authActions"
import DefaultNavBar from "../../components/DefaultNavBar"
import ErrorAlert from "../../components/ErrorAlert"
import React, {Component} from "react"
import {StyleSheet, View, Alert} from "react-native"
import t from "tcomb-form-native"
import I18n from "../../lib/I18n"
import UserProfileImage from "../user/components/UserProfileImage"

/**
 * ## Redux boilerplate
 */
function mapStateToProps(state) {
  return {
    profile: state.profile,
    global: {
      currentUser: state.global.currentUser,
      currentState: state.global.currentState,
      showState: state.global.showState
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...profileActions, ...authActions, ...globalActions}, dispatch)
  }
}

class ProfileScreen extends Component {

  /**
   * ## Profile class
   * Set the initial state and prepare the errorAlert
   */
  constructor(props) {
    super(props);

    this.errorAlert = new ErrorAlert()
    this.state = {
      formValues: {
        email: ''
      }
    }
  }

  /**
   * ### componentWillReceiveProps
   *
   * Since the Forms are looking at the state for the values of the
   * fields, when we we need to set them
   */
  componentWillReceiveProps(props) {
    this.setState({
      formValues: {
        email: props.profile.form.fields.email
      }
    })
  }

  /**
   * ### componentDidMount
   *
   * During Hot Loading, when the component mounts due the state
   * immediately being in a "logged in" state, we need to just set the
   * form fields.  Otherwise, we need to go fetch the fields
   */
  componentDidMount() {
    if (this.props.profile.form.fields.email === '') {
      this.props.actions.getProfile(this.props.global.currentUser)
    } else {
      this.setState({
        formValues: {
          email: this.props.profile.form.fields.email
        }
      })
    }
  }

  handleLogoutPress() {
    let self = this

    // Works on both iOS and Android
    Alert.alert(
      'Are you sure?',
      'Are you sure you log out?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => self.props.actions.logout()}
      ]
    )
  }

  /**
   * ### render
   * display the form wrapped with the header and button
   */
  render() {

    return (
      <Content>
        <DefaultNavBar title={I18n.t('Navigation.profile')}/>
        <UserProfileImage style={styles.userProfile} onPress={() => this.openControlPanel()}/>

        <Button onPress={this.handleLogoutPress.bind(this)}>Logout</Button>
      </Content>
    )
  }
}

/**
 * ## Styles
 */
var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'transparent'
  },
  userProfile: {
    width: 200,
    height: 100
  },
  inputs: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
