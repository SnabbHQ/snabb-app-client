/**
 * Register.js
 *
 * Allow user to register
 */
'use strict';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as authActions from '../reducers/auth/authActions'
import LoginRender from '../components/LoginRender'
import React, {Component} from 'react'
import NavBar, {NavButton} from 'react-native-nav'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Actions} from 'react-native-router-flux'
import
{
  View,
} from 'react-native'

const {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
} = require('../lib/constants').default;

/**
 * ## Redux boilerplate
 */

function mapStateToProps(state) {
  return {
    auth: state.auth,
    global: state.global
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  }
}

function buttonPressHandler(signup, username, email, password) {
  signup(username, email, password)
}

/**
 * ### Translations
 */
var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations;

class RegisterView extends Component {

  backButtonPress() {
    Actions.pop();
  }

  render() {
    let loginButtonText = I18n.t('Register.register')
    let onButtonPress = buttonPressHandler.bind(null,
      this.props.actions.signup,
      this.props.auth.form.fields.username,
      this.props.auth.form.fields.email,
      this.props.auth.form.fields.password)

    return (
      <View>
        <NavBar>
          <NavButton onPress={this.backButtonPress.bind(this)}>
            <Icon name="arrow-back" size={30} color="#444444"/>
          </NavButton>
        </NavBar>

        <LoginRender
          formType={REGISTER}
          loginButtonText={loginButtonText}
          onButtonPress={onButtonPress}
          displayPasswordCheckbox
          leftMessageType={FORGOT_PASSWORD}
          rightMessageType={LOGIN}
          auth={this.props.auth}
          global={this.props.global}
        />
      </View>
    )
  }
}
;

export default connect(mapStateToProps, mapDispatchToProps)(RegisterView)
