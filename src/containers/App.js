'use strict'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

/**
 * Project actions
 */
import * as authActions from '../reducers/auth/authActions'
import * as deviceActions from '../reducers/device/deviceActions'
import * as globalActions from '../reducers/global/globalActions'

/**
 * Router
 */
import {Actions} from 'react-native-router-flux'

/**
 * The components we need from ReactNative
 */
import React from 'react'
import
{
  StyleSheet,
  View,
  Text
}
  from 'react-native'

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
    actions: bindActionCreators({...authActions, ...deviceActions, ...globalActions}, dispatch)
  }
}

/**
 * ## App class
 */
var reactMixin = require('react-mixin');
import TimerMixin from 'react-timer-mixin'

/**
 * ### Translations
 */
var I18n = require('react-native-i18n');
import Translations from '../lib/Translations'
I18n.translations = Translations;

let App = React.createClass({
  /**
   * See if there's a sessionToken from a previous login
   *
   */
  componentDidMount () {
    // Use a timer so App screen is displayed
    this.setTimeout(
      () => {

        // var sessionToken = this.props.actions.getSessionToken();
        // sessionToken.then({
        //   Actions.
        // });

        Actions.SplashScreenView();
        // Actions.Home({
        //   title: 'Subview'
        //   // you can add additional props to be passed to Subview here...
        // })
      },
      200
    )
  },

  render() {
    return (
      <View>
        <Text style={styles.summary}>{I18n.t('App.loading')}</Text>
      </View>
    )
  }
});

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    marginTop: 80,
    padding: 10
  },
  summary: {
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

// Since we're using ES6 classes, have to define the TimerMixin
reactMixin(App.prototype, TimerMixin)
/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(App)
