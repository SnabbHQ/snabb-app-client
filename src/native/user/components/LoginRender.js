/**
 * # Login.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */


/**
 * ## Imports
 *
 * Redux
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from '../../../common/auth/authActions';
import * as globalActions from '../../../common/global/globalActions';

import { Actions } from 'react-native-router-flux';
import Header from '../../app/components/Header';
import ErrorAlert from '../../app/components/ErrorAlert';
import FormButton from '../../app/components/FormButton';
import LoginForm from './LoginForm';
import ItemCheckbox from '../../app/components/ItemCheckbox';
import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, TouchableHighlight, View } from 'react-native';
import I18n from '../../../common/lib/I18n';

import Dimensions from 'Dimensions';
let { height, width } = Dimensions.get('window'); // Screen dimensions in current orientation

/**
 * The states were interested in
 */
const {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD,
} = require('../../../common/lib/constants').default;

/**
 * ## Redux boilerplate
 */

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...authActions, ...globalActions }, dispatch),
  };
}

class LoginRender extends Component {
  constructor(props) {
    super(props);
    this.errorAlert = new ErrorAlert();
    this.state = {
      value: {
        email: this.props.auth.form.fields.email,
        password: this.props.auth.form.fields.password,
        passwordAgain: this.props.auth.form.fields.passwordAgain,
      },
    };
  }

  /**
   * ### componentWillReceiveProps
   * As the properties are validated they will be set here.
   */
  componentWillReceiveProps(nextprops) {
    this.setState({
      value: {
        email: nextprops.auth.form.fields.email,
        password: nextprops.auth.form.fields.password,
        passwordAgain: nextprops.auth.form.fields.passwordAgain,
      },
    });
  }

  /**
   * ### onChange
   *
   * As the user enters keys, this is called for each key stroke.
   * Rather then publish the rules for each of the fields, I find it
   * better to display the rules required as long as the field doesn't
   * meet the requirements.
   * *Note* that the fields are validated by the authReducer
   */
  onChange(value) {
    if (value.email !== '') {
      this.props.actions.onAuthFormFieldChange('email', value.email);
    }
    if (value.password !== '') {
      this.props.actions.onAuthFormFieldChange('password', value.password);
    }
    if (value.passwordAgain !== '') {
      this.props.actions.onAuthFormFieldChange('passwordAgain', value.passwordAgain);
    }
    this.setState(
      { value },
    );
  }

  /**
   *  Get the appropriate message for the current action
   *  @param messageType FORGOT_PASSWORD, or LOGIN, or REGISTER
   *  @param actions the action for the message type
   */
  getMessage(messageType, actions) {
    const forgotPassword =
      (<TouchableHighlight
        onPress={() => {
          actions.forgotPasswordState();
          Actions.ForgotPasswordScreen();
        }}
      >
        <Text>{I18n.t('LoginRender.forgot_password')}</Text>
      </TouchableHighlight>);

    const alreadyHaveAccount =
      (<TouchableHighlight
        onPress={() => {
          actions.loginState();
          Actions.LoginScreen();
        }}
      >
        <Text>{I18n.t('LoginRender.already_have_account')}</Text>
      </TouchableHighlight>);

    const register =
      (<TouchableHighlight
        onPress={() => {
          actions.registerState();
          Actions.RegisterScreen();
        }}
      >
        <Text>{I18n.t('LoginRender.register')}</Text>
      </TouchableHighlight>);

    switch (messageType) {
      case FORGOT_PASSWORD:
        return forgotPassword;
      case LOGIN:
        return alreadyHaveAccount;
      case REGISTER:
        return register;
    }
  }

  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {
    const formType = this.props.formType;
    const loginButtonText = this.props.loginButtonText;
    const onButtonPress = this.props.onButtonPress;
    const displayPasswordCheckbox = this.props.displayPasswordCheckbox;
    const leftMessageType = this.props.leftMessageType;
    const rightMessageType = this.props.rightMessageType;

    let passwordCheckbox = <Text />;
    const leftMessage = this.getMessage(leftMessageType, this.props.actions);
    const rightMessage = this.getMessage(rightMessageType, this.props.actions);

    const self = this;

    // display the login / register / change password screens
    this.errorAlert.checkError(this.props.auth.form.error);

    /**
     * Toggle the display of the Password and PasswordAgain fields
     */
    if (displayPasswordCheckbox) {
      passwordCheckbox =
        (<ItemCheckbox
          text={I18n.t('LoginRender.show_password')}
          disabled={this.props.auth.form.isFetching}
          onCheck={() => {
            this.props.actions.onAuthFormFieldChange('showPassword', true);
          }}
          onUncheck={() => {
            this.props.actions.onAuthFormFieldChange('showPassword', false);
          }}
        />);
    }

    /**
     * The LoginForm is now defined with the required fields.  Just
     * surround it with the Header and the navigation messages
     * Note how the button too is disabled if we're fetching. The
     * header props are mostly for support of Hot reloading.
     * See the docs for Header for more info.
     */

    return (
      <View style={styles.container}>
        <ScrollView horizontal={false} width={width} height={height}>
          <View>
            <Header
              isFetching={this.props.auth.form.isFetching}
              showState={this.props.global.showState}
              currentState={this.props.global.currentState}
              onGetState={this.props.actions.getState}
              onSetState={this.props.actions.setState}
            />

            <View style={styles.inputs}>
              <LoginForm
                formType={formType}
                form={this.props.auth.form}
                value={this.state.value}
                onChange={self.onChange.bind(self)}
              />
              {passwordCheckbox}
            </View>

            <FormButton
              isDisabled={!this.props.auth.form.isValid || this.props.auth.form.isFetching}
              onPress={onButtonPress}
              buttonText={loginButtonText}
            />

            <View >
              <View style={styles.forgotContainer}>
                {leftMessage}
                {rightMessage}
              </View>
            </View>

          </View>
        </ScrollView>
      </View>
    );
  }
}

/**
 * ## Styles
 */
let styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  inputs: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  forgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default connect(null, mapDispatchToProps)(LoginRender);
