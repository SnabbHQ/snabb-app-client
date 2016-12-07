/**
 * # profileInitialState.js
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

/**
 * ## Form
 * This Record contains the state of the form and the
 * fields it contains.
 *
 * The originalProfile is what the server provided and has the objectId
 * The fields are what display on the UI
 */
const Form = Record({
  originalProfile: new (Record({
    name: null,
    lastName: null,
    phoneNumber: null,
    email: null,
    thumbnail: null,
    objectId: null,
    emailVerified: null
  })),
  disabled: false,
  error: null,
  isValid: false,
  isFetching: false,
  updated: false,
  fields: new (Record({
    name: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    thumbnail: '',
    emailHasError: false,
    emailErrorMsg: '',
    emailVerified: false
  }))
})

let InitialState = Record({
  form: new Form()
})

export default InitialState
