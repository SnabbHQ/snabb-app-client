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
import {StyleSheet, View, Alert, Platform} from "react-native"
import NavBar, {NavTitle, NavButton} from "react-native-nav"
import UserProfileImage from "../components/UserProfileImage"
import ImagePicker from 'react-native-image-picker'

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
        name: '',
        lastName: '',
        email: '',
        phoneNumber: '',
      },
      thumbnail: ''
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
      this.props.actions.onProfileFormFieldChange('name', value.name)
      this.props.actions.onProfileFormFieldChange('lastName', value.lastName)
      this.props.actions.onProfileFormFieldChange('email', value.email)
      this.props.actions.onProfileFormFieldChange('phoneNumber', value.phoneNumber)
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
        name: props.profile.form.fields.name,
        lastName: props.profile.form.fields.lastName,
        phoneNumber: props.profile.form.fields.phoneNumber,
        email: props.profile.form.fields.email,
      },
      thumbnail: props.profile.thumbnail
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
          name: this.props.profile.form.fields.name,
          lastName: this.props.profile.form.fields.lastName,
          phoneNumber: this.props.profile.form.fields.phoneNumber,
          email: this.props.profile.form.fields.email
        },
        thumbnail: this.props.profile.thumbnail
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
      this.props.profile.form.fields.name,
      this.props.profile.form.fields.lastName,
      this.props.profile.form.fields.phoneNumber,
      this.props.profile.form.fields.email,
      this.props.profile.thumbnail,
      this.props.global.currentUser)

    Actions.pop();
  }

  onChangeProfilePhotoPress() {

    var options = {
      title: 'Select Profile Image',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // You can display the image using either data...
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        // or a reference to the platform specific asset location
        if (Platform.OS === 'ios') {
          const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        } else {
          const source = {uri: response.uri, isStatic: true};
        }

        this.setState({
          thumbnail: source
        })
      }
    });
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
              <UserProfileImage size={80} style={{alignSelf: 'center'}}
                                onPress={this.onChangeProfilePhotoPress.bind(this)}/>
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
                <Input placeholder='First Name' style={{flex: 1, alignSelf: 'stretch'}}
                       value={this.state.formValues.name}/>
              </Row>
              <View style={{backgroundColor: '#E7E7E7', height: 1}}/>
              <Row>
                <Input placeholder='Last Name' style={{flex: 1, alignSelf: 'stretch'}}
                       value={this.state.formValues.lastName}/>
              </Row>
            </Col>
          </Row>
          <Row size={3} style={{backgroundColor: '#E7E7E7', flexDirection: 'column', paddingTop: 30}}>
            <Text style={{fontSize: 17, marginLeft: 20, marginBottom: 10}}>Personal Information</Text>
            <List style={{backgroundColor: 'white'}}>
              <ListItem iconLeft>
                <Icon name='ios-call-outline'/>
                <Input placeholder='Mobile Telephone' value={this.state.formValues.phoneNumber}/>
              </ListItem>
              <ListItem iconLeft>
                <Icon name='ios-mail-outline'/>
                <Input placeholder='Email' value={this.state.formValues.email}/>
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
