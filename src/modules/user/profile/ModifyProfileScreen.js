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
import {Actions} from "react-native-router-flux"
import {TextInput, Input, Icon, Text, Grid, Col, Row, List, ListItem} from "native-base"
import * as profileActions from "../../../reducers/user/profile/profileActions"
import * as globalActions from "../../../reducers/global/globalActions"
import * as authActions from "../../../reducers/user/auth/authActions"
import ErrorAlert from "../../../components/ErrorAlert"
import React, {Component} from "react"
import {StyleSheet, View, Alert} from "react-native"
import NavBar, {NavTitle, NavButton} from "react-native-nav"
import UserProfileImage from "../components/UserProfileImage"

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

class ModifyProfileScreen extends Component {

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
   * ### onChange
   *
   * When any fields change in the form, fire this action so they can
   * be validated.
   *
   */
  onChange(value) {
    if (value.email !== '') {
      this.props.actions.onProfileFormFieldChange('email', value.email)
    }
    this.setState({value})
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

  onBackButtonPress() {
    Actions.pop();
  }

  onUpdateProfilePress() {

    // TODO - Make sure this actually works!

    /**
     * When the button is pressed, send the users info including the
     * ```currrentUser``` object as it contains the sessionToken and
     * user objectId
     */
    this.props.actions.updateProfile(
      this.props.profile.form.originalProfile.objectId,
      this.props.profile.form.fields.username,
      this.props.profile.form.fields.email,
      this.props.global.currentUser)

    Actions.pop();
  }

  /**
   * ### render
   * display the form wrapped with the header and button
   */
  render() {
    this.errorAlert.checkError(this.props.profile.form.error);

    return (
      <View style={styles.container}>
        <NavBar>
          <NavButton onPress={this.onBackButtonPress.bind(this)}>
            <Text>Cancel</Text>
          </NavButton>
          <NavTitle>Edit Profile</NavTitle>
          <NavButton onPress={this.onUpdateProfilePress.bind(this)}>
            <Text style={{color: '#00D5D5', fontWeight: 'bold'}}>Save</Text>
          </NavButton>
        </NavBar>
        <Grid>
          <Row size={1}>
            <Col size={1.5} style={{padding: 10, alignItems: 'center', justifyContent: 'center'}}>
              <UserProfileImage size={80} style={{alignSelf: 'center'}}/>
              <Text style={{
                fontSize: 12,
                paddingLeft: 4,
                paddingRight: 4,
                fontWeight: 'bold',
                color: 'white',
                backgroundColor: '#00D5D5'
              }}>Change</Text>
            </Col>
            <Col size={3} style={{padding: 5}}>
              <Row>
                <Input placeholder='First Name' style={{flex: 1, alignSelf: 'stretch'}}/>
              </Row>
              <View style={{backgroundColor: '#E7E7E7', height: 1}}/>
              <Row>
                <Input placeholder='Last Name' style={{flex: 1, alignSelf: 'stretch'}}/>
              </Row>
            </Col>
          </Row>
          <Row size={3} style={{backgroundColor: '#E7E7E7', flexDirection: 'column', paddingTop: 30}}>
            <Text style={{fontSize: 17, marginLeft: 20, marginBottom: 10}}>Personal Information</Text>
            <List style={{backgroundColor: 'white'}}>
              <ListItem iconLeft>
                <Icon name='ios-call-outline'/>
                <Input placeholder='Mobile Telephone'/>
              </ListItem>
              <ListItem iconLeft>
                <Icon name='ios-mail-outline'/>
                <Input placeholder='Email'/>
              </ListItem>
            </List>
          </Row>
        </Grid>
      </View>
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ModifyProfileScreen)
