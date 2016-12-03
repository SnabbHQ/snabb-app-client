'use strict';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as authActions from "../../../common/user/auth/authActions";
import LoginRender from "./components/LoginRender";
import React, {Component} from "react";
import {View} from "react-native";
import NavBar, {NavButton} from "react-native-nav";
import Icon from "react-native-vector-icons/MaterialIcons";
import {Actions} from "react-native-router-flux";
import I18n from '../../../common/lib/I18n'

const {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
} = require('../../../common/lib/constants').default

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
