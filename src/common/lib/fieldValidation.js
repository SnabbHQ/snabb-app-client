/**
 * # fieldValidation.js
 *
 * Define the validation rules for various fields such as email,
 * and passwords.  If the rules are not passed, the appropriate
 * message is displayed to the user
 *
 */
'use strict'

/**
 * ## Imports
 *
 * validate and underscore
 *
 */
import validate from 'validate.js'
import _ from 'underscore'


/**
 * ## Email validation setup
 * Used for validation of emails
 */
const emailConstraints = {
  from: {
    email: true
  }
}


/**
* ## password validation rule
* read the message... ;)
*/
// const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/
const passwordPattern = /^[a-zA-Z0-9]{6,12}$/
const passwordConstraints = {
  password: {
    format: {
      pattern: passwordPattern,
      flags: 'i'
    }
  }
}

const passwordAgainConstraints = {
  confirmPassword: {
    equality: 'password'
  }
}

/**
 * ## Field Validation
 * @param {Object} state Redux state
 * @param {Object} action type & payload
 */

// TODO - Make sure we change back all the localised messages
export default function fieldValidation (state, action) {
  const {field, value} = action.payload

  switch (field) {
    /**
     * ### email validation
     * set the form field error
     */
    case ('email'):
      let validEmail = _.isUndefined(validate({from: value},
                                             emailConstraints))
      if (validEmail) {
        return state.setIn(['form', 'fields', 'emailHasError'], false)
      } else {
        return state.setIn(['form', 'fields', 'emailHasError'], true)
        .setIn(['form', 'fields', 'emailErrorMsg'],
                 'Email is not valid')
      }

    /**
     * ### password validation
     * set the form field error
     */
    case ('password'):
      let validPassword = _.isUndefined(validate({password: value},
                                               passwordConstraints))
      if (validPassword) {
        return state.setIn(['form', 'fields', 'passwordHasError'],
                         false)
        .setIn(['form', 'fields', 'passwordErrorMsg'],
               '')
      } else {
        return state.setIn(['form', 'fields', 'passwordHasError'], true)
        .setIn(['form', 'fields', 'passwordErrorMsg'],
          'Password not valid')
      }

    /**
     * ### passwordAgain validation
     * set the form field error
     */
    case ('passwordAgain'):
      var validPasswordAgain =
          _.isUndefined(validate({password: state.form.fields.password,
                                confirmPassword: value}, passwordAgainConstraints))
      if (validPasswordAgain) {
        return state.setIn(['form', 'fields', 'passwordAgainHasError'],
                         false)
        .setIn(['form', 'fields', 'passwordAgainErrorMsg'], '')
      } else {
        return state.setIn(['form', 'fields', 'passwordAgainHasError'],
                          true)
        .setIn(['form', 'fields', 'passwordAgainErrorMsg'],
        'Passwords are not equal or invalid')
      }

    /**
     * ### showPassword
     * toggle the display of the password
     */
    case ('showPassword'):
      return state.setIn(['form', 'fields',
                                'showPassword'], value)

  }
  return state
}
