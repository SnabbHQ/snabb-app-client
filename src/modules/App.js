'use strict';

import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {Actions} from "react-native-router-flux"
import * as authActions from "../reducers/user/auth/authActions"
import * as deviceActions from "../reducers/device/deviceActions"
import * as globalActions from "../reducers/global/globalActions"
import * as profileActions from "../reducers/user/profile/actions/profileActions"
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
    profile: {
      form: {
        isFetching: state.profile.form.isFetching,
        user: state.profile.form.fields
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
    actions: bindActionCreators({...authActions, ...profileActions, ...deviceActions, ...globalActions}, dispatch)
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
        this.props.actions.getUserProfile()
      },
      500
    )
  },

  componentWillReceiveProps(newProps) {
    if (newProps.profile.form.user) {
      Actions.HomeScreen()
    }
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.summary}>{I18n.t('General.loading')}</Text>
      </View>
    )
  }
});

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
