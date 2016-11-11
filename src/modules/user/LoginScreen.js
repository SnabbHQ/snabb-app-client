'use strict';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as authActions from "../../reducers/user/auth/authActions";
import LoginRender from "./components/LoginRender";
import React, {Component} from "react";
import {View} from "react-native";
import NavBar, {NavButton} from "react-native-nav";
import Icon from "react-native-vector-icons/MaterialIcons";
import {Actions} from "react-native-router-flux";
import Translations from "../../lib/Translations";

const {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
} = require('../../lib/constants').default

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

function buttonPressHandler(login, email, password) {
  login(email, password)
}

/**
 * ### Translations
 */
var I18n = require('react-native-i18n')
I18n.translations = Translations

class LoginScreen extends Component {

  backButtonPress() {
    Actions.pop();
  };

  render() {
    let loginButtonText = I18n.t('Login.login');
    let onButtonPress = buttonPressHandler.bind(null,
      this.props.actions.login,
      this.props.auth.form.fields.email,
      this.props.auth.form.fields.password
    );

    return (
      <View>
        <NavBar>
          <NavButton onPress={this.backButtonPress.bind(this)}>
            <Icon name="arrow-back" size={30} color="#444444"/>
          </NavButton>
        </NavBar>

        <LoginRender
          formType={LOGIN}
          loginButtonText={loginButtonText}
          onButtonPress={onButtonPress}
          displayPasswordCheckbox
          leftMessageType={REGISTER}
          rightMessageType={FORGOT_PASSWORD}
          auth={this.props.auth}
          global={this.props.global}
        />
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)