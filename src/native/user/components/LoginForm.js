/**
 * # LoginForm.js
 *
 * This class utilizes the ```tcomb-form-native``` library and just
 * sets up the options required for the 3 states of Login, namely
 * Login, Register or Reset Password
 *
 */


/**
 * ## Import
 *
 * React
 */
import React, { PropTypes } from 'react';

/**
 * States of login display
 */
const {
  REGISTER,
  LOGIN,
  FORGOT_PASSWORD,
} = require('../../../common/lib/constants').default;

/**
 *  The fantastic little form library
 */
const t = require('tcomb-form-native');
const Form = t.form.Form;

/**
 * ### Translations
 */
const I18n = require('react-native-i18n');
import Translations from '../../../common/lib/Translations';
I18n.translations = Translations;

const LoginForm = React.createClass({
  /**
   * ## LoginForm class
   *
   * * form: the properties to set into the UI form
   * * value: the values to set in the input fields
   * * onChange: function to call when user enters text
   */
  propTypes: {
    formType: PropTypes.string,
    form: PropTypes.object,
    value: PropTypes.object,
    onChange: PropTypes.func,
  },

  /**
   * ## render
   *
   * setup all the fields using the props and default messages
   *
   */
  render() {
    const formType = this.props.formType;

    const options = {
      fields: {
      },
    };

    const email = {
      label: I18n.t('LoginForm.email'),
      keyboardType: 'email-address',
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.emailHasError,
      error: this.props.form.fields.emailErrorMsg,
    };

    const secureTextEntry = !this.props.form.fields.showPassword;

    const password = {
      label: I18n.t('LoginForm.password'),
      maxLength: 12,
      secureTextEntry,
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.passwordHasError,
      error: this.props.form.fields.passwordErrorMsg,
    };

    const passwordAgain = {
      label: I18n.t('LoginForm.password_again'),
      secureTextEntry,
      maxLength: 12,
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.passwordAgainHasError,
      error: this.props.form.fields.passwordAgainErrorMsg,
    };

    let loginForm;
    switch (formType) {
      /**
       * ### Registration
       * The registration form has 4 fields
       */
      case (REGISTER):
        loginForm = t.struct({
          email: t.String,
          password: t.String,
          passwordAgain: t.String,
        });
        options.fields.email = email;
        options.fields.email.placeholder = I18n.t('LoginForm.email');
        options.fields.email.autoCapitalize = 'none';
        options.fields.password = password;
        options.fields.password.placeholder = I18n.t('LoginForm.password');
        options.fields.passwordAgain = passwordAgain;
        options.fields.passwordAgain.placeholder = I18n.t('LoginForm.password_again');
        break;

      /**
       * ### Login
       * The login form has only 3 fields
       */
      case (LOGIN):
        loginForm = t.struct({
          email: t.String,
          password: t.String,
        });
        options.fields.email = email;
        options.fields.email.autoCapitalize = 'none';
        options.fields.password = password;
        options.fields.password.placeholder = I18n.t('LoginForm.password');
        break;

      /**
       * ### Reset password
       * The password reset form has only 1 field
       */
      case (FORGOT_PASSWORD):
        loginForm = t.struct({
          email: t.String,
        });
        options.fields.email = email;
        options.fields.email.autoCapitalize = 'none';
        options.fields.email.placeholder = I18n.t('LoginForm.email');
        break;
    } // switch

    /**
     * ### Return
     * returns the Form component with the correct structures
     */
    return (
      <Form
        ref="form"
        type={loginForm}
        options={options}
        value={this.props.value}
        onChange={this.props.onChange}
      />

    );
  },
});

module.exports = LoginForm;

