/**
 * # authInitialState.js
 *
 * This class is a Immutable object
 * Working *successfully* with Redux, requires
 * state that is immutable.
 * In my opinion, that can not be by convention
 * By using Immutable, it's enforced.  Just saying....
 *
 */
'use strict';

const {Record} = require('immutable');
const {
  REGISTER
} = require('../.././constants').default;

/**
 * ## Form
 * This Record contains the state of the form and the
 * fields it contains.
 */
const Form = Record({
  state: REGISTER,
  disabled: false,
  error: null,
  isValid: false,
  isFetching: false,
  fields: new (Record({
    email: '',
    emailHasError: false,
    emailErrorMsg: '',
    password: '',
    passwordHasError: false,
    passwordErrorMsg: '',
    passwordAgain: '',
    passwordAgainHasError: false,
    passwordAgainErrorMsg: '',
    showPassword: false
  }))
})

/**
 * ## InitialState
 * The form is set
 */
var InitialState = Record({
  form: new Form()
})
export default InitialState

