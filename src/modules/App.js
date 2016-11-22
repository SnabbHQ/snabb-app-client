'use strict'

import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {Actions} from "react-native-router-flux";
import * as profileActions from "../reducers/user/profile/actions/profileActions"
import React, {Component} from "react"
import {StyleSheet, View, Text} from "react-native"
import TimerMixin from "react-timer-mixin"
import ReactMixin from "react-mixin"
import I18n from "../lib/I18n"

/**
 *  Save that state
 */
function mapStateToProps(state) {
  return {
    deviceVersion: state.device.version,
    profile: {
      form: {
        isFetching: state.profile.form.isFetching,
        user: state.profile.form.fields
      }
    }
  }
}

/**
 * Bind all the actions from authActions, deviceActions and globalActions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...profileActions}, dispatch)
  }
}

class App extends Component {

  /**
   * See if there's a sessionToken from a previous login
   */
  componentDidMount () {
    // Use a timer so App screen is displayed
    this.setTimeout(
      () => {
        this.props.actions.getUserProfile()
      },
      500
    )
  }

  componentWillReceiveProps(newProps) {
    const { form } = newProps.profile;
    if (!form.isFetching) {
      if (form.user && form.user.email) {
        Actions.HomeScreen()
      } else {
        Actions.LoginRegisterScreen()
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.summary}>{I18n.t('General.loading')}</Text>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    padding: 10
  },
  summary: {
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 20,
    fontWeight: 'bold'
  }
});

// Since we're using ES6 classes, have to define the TimerMixin
ReactMixin(App.prototype, TimerMixin);

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(App)
