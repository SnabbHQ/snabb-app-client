/**
 * # ForgotPassword.js
 *
 */


import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from '../../common/auth/actions';
import LoginRender from './components/LoginRender';
import I18n from '../../common/lib/I18n';

const {
  REGISTER,
  LOGIN,
  FORGOT_PASSWORD,
} = require('../../common/lib/constants').default;


function mapStateToProps(state) {
  return {
    auth: state.auth,
    global: state.global,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch),
  };
}

function buttonPressHandler(resetPassword, email) {
  resetPassword(email);
}

class ForgotPasswordScreen extends Component {

  render() {
    const loginButtonText = I18n.t('ForgotPasswordScreen.reset_password');
    const onButtonPress = buttonPressHandler.bind(null,
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
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen);
