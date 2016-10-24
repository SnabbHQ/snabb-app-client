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
import {Dimensions, StyleSheet, View, Text} from "react-native";
import Swiper from 'react-native-swiper';

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

  handleLoginPress() {
    Actions.LoginView();
  }

  handleRegisterPress() {
    Actions.RegisterView();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 10}}>
          <Swiper height={Dimensions.get('window').height - 50} style={styles.wrapper}
                  showsButtons={false}
                  dot={<View style={{backgroundColor: '#BABABA', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                  activeDot={<View style={{backgroundColor: '#00D5D5', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}>
            <View style={styles.slide1}>
              <Text style={styles.text}>Hello Swiper</Text>
            </View>
            <View style={styles.slide2}>
              <Text style={styles.text}>Beautiful</Text>
            </View>
            <View style={styles.slide3}>
              <Text style={styles.text}>And simple</Text>
            </View>
          </Swiper>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Button style={styles.buttonRegister} textStyle={{color: '#F9F9F9'}}
                  onPress={this.handleRegisterPress.bind(this)}>
            {I18n.t('LoginRegisterView.new_account')}

          </Button>
          <Button style={styles.buttonLogin} textStyle={{color: '#00D5D5'}}
                  onPress={this.handleLoginPress.bind(this)}>
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
    borderColor: '#F9F9F9',
    marginLeft: 5,
    marginRight: 10,
    flex: 1
  },
  buttonRegister: {
    backgroundColor: '#00D5D5',
    borderColor: '#00D5D5',
    marginLeft: 10,
    marginRight: 5,
    flex: 1
  },
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
});

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(LoginRegisterView)
