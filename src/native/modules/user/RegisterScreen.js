
'use strict';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as authActions from "../../../common/user/auth/authActions";
import LoginRender from "./components/LoginRender";
import React, {Component} from "react";
import DefaultNavBar from "../../app/components/DefaultNavBar";
import {Actions} from "react-native-router-flux";
import {View} from "react-native";
import I18n from "../../../common/lib/I18n";

const {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
} = require('../../../common/lib/constants').default;

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

class RegisterScreen extends Component {

  render() {
    let loginButtonText = I18n.t('Register.register')
    let onButtonPress = buttonPressHandler.bind(null,
      this.props.actions.signup,
      this.props.auth.form.fields.username,
      this.props.auth.form.fields.email,
      this.props.auth.form.fields.password)

    return (
      <View>
        <DefaultNavBar title={I18n.t('Register.register')}/>

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


export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
