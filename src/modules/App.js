'use strict';

import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {Actions} from "react-native-router-flux"
import * as authActions from "../reducers/user/auth/authActions"
import * as deviceActions from "../reducers/device/deviceActions"
import * as globalActions from "../reducers/global/globalActions"
import getProfile from "../reducers/user/profile/epics/getProfile"
import React from "react"
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
    auth: {
      form: {
        isFetching: state.auth.form.isFetching
      }
    },
    global: {
      currentState: state.global.currentState,
      showState: state.global.showState
    }
  }
}

/**
 * Bind all the actions from authActions, deviceActions and globalActions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...authActions, getProfile, ...deviceActions, ...globalActions}, dispatch)
  }
}

let App = React.createClass({
  /**
   * See if there's a sessionToken from a previous login
   *
   */
  componentDidMount () {

    // Use a timer so App screen is displayed
    this.setTimeout(
      () => {
        this.props.actions.getSessionToken()
          .then(token => this.props.actions.getProfile(token))
          .then(() => Actions.HomeScreen())
          .catch(() => Actions.LoginRegisterScreen())
      },
      500
    )
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.summary}>{I18n.t('General.loading')}</Text>
      </View>
    )
  }
});

const styles = StyleSheet.create({
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
