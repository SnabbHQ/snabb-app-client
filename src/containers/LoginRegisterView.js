/**
 * # Main.js
 *  This is the main app screen
 *
 */
'use strict';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as authActions from "../reducers/auth/authActions";
import * as globalActions from "../reducers/global/globalActions";
import {Actions} from "react-native-router-flux";
import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import Translations from "../lib/Translations";

/**
 * The platform neutral button
 */
const Button = require('apsl-react-native-button')

/**
 *  Instead of including all app states via ...state
 *  One could explicitly enumerate only those which SplashScreenView.js will depend on.
 *
 */
function mapStateToProps(state) {
  return {
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

/*
 * Bind all the actions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...authActions, ...globalActions}, dispatch)
  }
}

/**
 * ### Translations
 */
var I18n = require('react-native-i18n')
I18n.translations = Translations

/**
 * ## App class
 */
class LoginRegisterView extends Component {

  handlePress() {
    Actions.Subview({
      title: 'Subview'
      // you can add additional props to be passed to Subview here...
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 10}}/>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Button style={styles.buttonRegister} textStyle={{color: '#F9F9F9'}} onPress={this.handlePress.bind(this)}>
            {I18n.t('LoginRegisterView.new_account')}

          </Button>
          <Button style={styles.buttonLogin} textStyle={{color: '#00D5D5'}} onPress={this.handlePress.bind(this)}>
            {I18n.t('LoginRegisterView.sign_in')}
          </Button>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#009595'
  },
  summary: {
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonLogin: {
    backgroundColor: '#F9F9F9',
    marginLeft: 10,
    marginRight: 10,
    flex: 1
  },
  buttonRegister: {
    backgroundColor: '#00D5D5',
    marginLeft: 10,
    marginRight: 10,
    flex: 1
  }
});

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(LoginRegisterView)
