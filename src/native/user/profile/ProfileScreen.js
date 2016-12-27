/**
 * # Profile.js
 *
 * This component provides an interface for a logged in user to change
 * their email.
 * It too is a container so there is boilerplate from Redux similar to
 * ```App``` and ```Login```
 */


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Content, Text, Button, Grid, Icon, Row, List, ListItem } from 'native-base';
import * as profileActions from '../../../common/user/profile/epics';
import * as globalActions from '../../../common/global/globalActions';
import * as authActions from '../../../common/auth/actions';
import DefaultNavBar from '../../app/components/DefaultNavBar';
import ErrorAlert from '../../app/components/ErrorAlert';
import React, { Component } from 'react';
import { StyleSheet, View, Alert, TouchableOpacity } from 'react-native';
import I18n from '../../../common/lib/I18n';
import UserProfileImage from '../components/UserProfileImage';

/**
 * ## Redux boilerplate
 */
function mapStateToProps(state) {
  return {
    profile: {
      name: state.profile.form.fields.name,
      lastName: state.profile.form.fields.lastName,
      phoneNumber: state.profile.form.fields.phoneNumber,
      email: state.profile.form.fields.email,
    },
    global: {
      currentUser: state.global.currentUser,
      currentState: state.global.currentState,
      showState: state.global.showState,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...profileActions, ...authActions, ...globalActions }, dispatch),
  };
}

class ProfileScreen extends Component {

  /**
   * ## Profile class
   * Set the initial state and prepare the errorAlert
   */
  constructor(props) {
    super(props);

    this.errorAlert = new ErrorAlert();
  }

  /**
   * ### componentDidMount
   *
   * During Hot Loading, when the component mounts due the state
   * immediately being in a "logged in" state, we need to just set the
   * form fields.  Otherwise, we need to go fetch the fields
   */
  componentDidMount() {
    if (this.props.profile.email === '') {
      this.props.actions.getProfile(this.props.global.currentUser);
    }
  }

  onEditProfilePress() {
    Actions.ModifyProfileScreen();
  }

  onLogoutPress() {
    const self = this;

    // Works on both iOS and Android
    Alert.alert(
      'Are you sure?',
      'Are you sure you log out?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => self.props.actions.logout() },
      ],
    );
  }

  /**
   * ### render
   * display the form wrapped with the header and button
   */
  render() {
    const nameFormatted = `${this.props.profile.name} ${this.props.profile.lastName}`;

    return (
      <View style={styles.container}>
        <DefaultNavBar title={I18n.t('Navigation.profile')} />
        <Content style={{ paddingTop: 20 }}>
          <Grid>
            <Row
              style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
            >
              <UserProfileImage size={100} style={styles.userProfile} />
              <Text>{nameFormatted}</Text>
              <Text>{this.props.profile.email}</Text>
              <Text>{this.props.profile.phoneNumber}</Text>
              <Button
                bordered style={{ marginTop: 10, marginBottom: 10, alignSelf: 'center' }}
                onPress={this.onEditProfilePress.bind(this)}
              >Edit
                Profile</Button>
            </Row>
            <Row style={{ backgroundColor: '#E7E7E7', flexDirection: 'column', paddingTop: 30 }}>
              <Text style={{ fontSize: 17, marginLeft: 20, marginBottom: 10 }}>Default Locations</Text>
              <List style={{ backgroundColor: 'white' }}>
                <ListItem iconLeft iconRight>
                  <Icon name="ios-chatboxes" />
                  <View style={{ marginLeft: 15 }}>
                    <Text style={{ fontWeight: 'bold' }}>Pickup Location</Text>
                    <Text style={{ fontSize: 13 }}>Olof Palmes Gatan, 13, Stockholm</Text>
                  </View>
                  <Icon name="ios-arrow-forward" />
                </ListItem>
                <ListItem iconLeft iconRight>
                  <Icon name="ios-alarm" />
                  <View style={{ marginLeft: 15 }}>
                    <Text style={{ fontWeight: 'bold' }}>Delivery Location</Text>
                    <Text style={{ fontSize: 13 }}>Handverkagatan, 5, Stockholm</Text>
                  </View>
                  <Icon name="ios-arrow-forward" />
                </ListItem>
              </List>

            </Row>
          </Grid>
        </Content>
        <View style={{ flexDirection: 'row' }}>
          <Button
            danger onPress={this.onLogoutPress.bind(this)}
            style={{ flex: 1, alignSelf: 'flex-end', margin: 10 }}
          >Logout</Button>
        </View>
      </View>
    );
  }
}

/**
 * ## Styles
 */
let styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'transparent',
  },
  userProfile: {
    width: 200,
    height: 100,
  },
  inputs: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
