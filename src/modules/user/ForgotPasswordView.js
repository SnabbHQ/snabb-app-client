/**
 * # ForgotPassword.js
 *
 */
'use strict';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as authActions from "../../reducers/user/auth/authActions";
import LoginRender from "./components/LoginRender";
import React from "react";
import Translations from "../../lib/Translations";

const {
  REGISTER,
  LOGIN,
  FORGOT_PASSWORD
} = require('../../lib/constants').default;


function mapStateToProps (state) {
  return {
    auth: state.auth,
    global: state.global
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  }
}

function buttonPressHandler (resetPassword, email) {
  resetPassword(email)
}

/**
 * ### Translations
 */
var I18n = require('react-native-i18n');
I18n.translations = Translations;

let ForgotPassword = React.createClass({

  render () {
    let loginButtonText = I18n.t('ForgotPassword.reset_password');
    let onButtonPress = buttonPressHandler.bind(null,
                                                this.props.actions.resetPassword,
                                                this.props.auth.form.fields.email);

    return (
      <LoginRender
        formType={FORGOT_PASSWORD}
        loginButtonText={loginButtonText}
        onButtonPress={onButtonPress}
        displayPasswordCheckbox={false}
        leftMessageType={REGISTER}
        rightMessageType={LOGIN}
        auth={this.props.auth}
        global={this.props.global}
      />
    )
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
