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
import {Content, TextInput, InputGroup, Input, Icon, Text, Grid, Col, Row, List, ListItem} from "native-base"
import * as profileActions from "../../reducers/user/profile/profileActions"
import * as globalActions from "../../reducers/global/globalActions"
import * as authActions from "../../reducers/user/auth/authActions"
import DefaultNavBar from "../../components/DefaultNavBar"
import ErrorAlert from "../../components/ErrorAlert"
import FormButton from "../../components/FormButton"
import ItemCheckbox from "../../components/ItemCheckbox"
import React, {Component} from "react"
import {StyleSheet, View, Alert} from "react-native"
import t from "tcomb-form-native"
import I18n from "../../lib/I18n"
import UserProfileImage from "../user/components/UserProfileImage"

let Form = t.form.Form;

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

  /**
   * ### render
   * display the form wrapped with the header and button
   */
  render() {
    this.errorAlert.checkError(this.props.profile.form.error);

    let self = this;

    let ProfileForm = t.struct({
      email: t.String
    });

    /**
     * Set up the field definitions.  If we're fetching, the fields
     * are disabled.
     */
    let options = {
      auto: 'placeholders',
      fields: {
        email: {
          label: I18n.t('Profile.email'),
          keyboardType: 'email-address',
          editable: !this.props.profile.form.isFetching,
          hasError: this.props.profile.form.fields.emailHasError,
          error: this.props.profile.form.fields.emailErrorMsg
        }
      }
    };

    /**
     * When the button is pressed, send the users info including the
     * ```currrentUser``` object as it contains the sessionToken and
     * user objectId
     */
    let profileButtonText = I18n.t('Profile.update')
    let onButtonPress = () => {
      this.props.actions.updateProfile(
        this.props.profile.form.originalProfile.objectId,
        this.props.profile.form.fields.username,
        this.props.profile.form.fields.email,
        this.props.global.currentUser)
    };

    /**
     * Wrap the form with the header and button.  The header props are
     * mostly for support of Hot reloading. See the docs for Header
     * for more info.
     */
    let verfiedText = I18n.t('Profile.verified') + ' (' + I18n.t('Profile.display') + ')';

    return (
      <View style={styles.container}>
        <DefaultNavBar title={I18n.t('Navigation.edit_profile')}/>
        <Grid>
          <Row size={1}>
            <Col size={1.5} style={{padding: 10, alignItems: 'center', justifyContent: 'center'}}>
              <UserProfileImage size={80} style={{alignSelf: 'center'}}/>
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
              <ListItem iconLeft iconRight>
                <Icon name='ios-chatboxes'/>
                <View style={{marginLeft: 15}}>
                  <Text style={{fontWeight: 'bold'}}>Pickup Location</Text>
                  <Text style={{fontSize: 13}}>Olof Palmes Gatan, 13, Stockholm</Text>
                </View>
                <Icon name='ios-arrow-forward'/>
              </ListItem>
              <ListItem iconLeft iconRight>
                <Icon name='ios-alarm'/>
                <View style={{marginLeft: 15}}>
                  <Text style={{fontWeight: 'bold'}}>Delivery Location</Text>
                  <Text style={{fontSize: 13}}>Handverkagatan, 5, Stockholm</Text>
                </View>
                <Icon name='ios-arrow-forward'/>
              </ListItem>
            </List>

            <FormButton
              isDisabled={!this.props.profile.form.isValid || this.props.profile.form.isFetching}
              onPress={onButtonPress.bind(self)}
              buttonText={profileButtonText}/>
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
