/**
 * # profileReducer.js
 *
 * The reducer user profile actions
 */
'use strict';

/**
 * ## Imports
 *
 * fieldValidation for validating the fields
 * formValidation for setting the form's valid flag
 */
import fieldValidation from '../../lib/fieldValidation'
import formValidation from './profileFormValidation'

/**
 * ## Actions
 *
 */
const {
  LOGOUT_SUCCESS,
  SET_STATE
} = require('../.././constants').default


import * as ActionTypes from './actions/ProfileActionTypes'

/**
 * ## Initial State
 *
 */
const InitialState = require('./profileInitialState').default
const initialState = new InitialState();

/**
 * ## profileReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function profileReducer(state = initialState, action) {
  let nextProfileState = null;

  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  switch (action.type) {
    /**
     * ### Request starts
     * set the form to fetching and clear any errors
     */
    case ActionTypes.GET_PROFILE_REQUEST:
    case ActionTypes.PROFILE_UPDATE_REQUEST:
      return state.setIn(['form', 'isFetching'], true)
        .setIn(['form', 'error'], null)
        .setIn(['form', 'updated'], false)

    /**
     * ### Request end successfully
     * set the form to fetching as done
     */
    case ActionTypes.PROFILE_UPDATE_SUCCESS:
      return state.setIn(['form', 'isFetching'], false)
        .setIn(['form', 'updated'], true)

    /**
     * ### Request ends successfully
     *
     * the fetching is done, set the UI fields and the originalProfile
     *
     * Validate the data to make sure it's all good and someone didn't
     * mung it up through some other mechanism
     */
    case ActionTypes.GET_PROFILE_SUCCESS:
      nextProfileState = state.setIn(['form', 'isFetching'], false)
        .setIn(['form', 'fields', 'name'], action.payload.name)
        .setIn(['form', 'fields', 'lastName'], action.payload.lastName)
        .setIn(['form', 'fields', 'phoneNumber'], action.payload.phoneNumber)
        .setIn(['form', 'fields', 'email'], action.payload.email)
        .setIn(['form', 'fields', 'thumbnail'], action.payload.thumbnail)
        .setIn(['form', 'fields', 'emailVerified'], action.payload.emailVerified)
        .setIn(['form', 'originalProfile', 'name'], action.payload.name)
        .setIn(['form', 'originalProfile', 'lastName'], action.payload.lastName)
        .setIn(['form', 'originalProfile', 'phoneNumber'], action.payload.phoneNumber)
        .setIn(['form', 'originalProfile', 'email'], action.payload.email)
        .setIn(['form', 'originalProfile', 'thumbnail'], action.payload.thumbnail)
        .setIn(['form', 'originalProfile', 'emailVerified'], action.payload.emailVerified)
        .setIn(['form', 'originalProfile', 'objectId'], action.payload.objectId)
        .setIn(['form', 'error'], null)

      return formValidation(
        fieldValidation(nextProfileState, action)
        , action)

    /**
     * User logged out, so reset form fields and original profile.
     *
     */
    case LOGOUT_SUCCESS:
      nextProfileState = state.setIn(['form', 'fields'], '')
        .setIn(['form', 'fields', 'name'], '')
        .setIn(['form', 'fields', 'lastName'], '')
        .setIn(['form', 'fields', 'phoneNumber'], '')
        .setIn(['form', 'fields', 'email'], '')
        .setIn(['form', 'fields', 'thumbnail'], '')
        .setIn(['form', 'fields', 'emailVerified'], false)
        .setIn(['form', 'originalProfile', 'name'], '')
        .setIn(['form', 'originalProfile', 'lastName'], '')
        .setIn(['form', 'originalProfile', 'phoneNumber'], '')
        .setIn(['form', 'originalProfile', 'email'], '')
        .setIn(['form', 'originalProfile', 'thumbnail'], '')
        .setIn(['form', 'originalProfile', 'emailVerified'], false)
        .setIn(['form', 'originalProfile', 'objectId'], null)
        .setIn(['form', 'error'], null);
      return formValidation(nextProfileState, action);

    /**
     * ### Request fails
     * we're done fetching and the error needs to be displayed to the user
     */
    case ActionTypes.GET_PROFILE_FAILURE:
    case ActionTypes.PROFILE_UPDATE_FAILURE:
      return state.setIn(['form', 'isFetching'], false)
        .setIn(['form', 'error'], action.payload)
        .setIn(['form', 'updated'], false)

    /**
     * ### form fields have changed
     *
     * Set the state with the fields, clear the form error
     * and perform field and form validation
     */
    case ActionTypes.ON_PROFILE_FORM_FIELD_CHANGE:
      const {field, value} = action.payload
      let nextState = state.setIn(['form', 'fields', field], value)
        .setIn(['form', 'error'], null)
        .setIn(['form', 'updated'], false)

      return formValidation(
        fieldValidation(nextState, action)
        , action)

    /**
     * ### set the state
     *
     * This is in support of Hot Loading - take the payload
     * and set the values into the state
     *
     */
    case SET_STATE:
      var profile = JSON.parse(action.payload).profile.form;
      var next = state.setIn(['form', 'disabled'], profile.disabled)
        .setIn(['form', 'error'], profile.error)
        .setIn(['form', 'isValid'], profile.isValid)
        .setIn(['form', 'isFetching'], profile.isFetching)
        .setIn(['form', 'originalProfile', 'name'], profile.originalProfile.name)
        .setIn(['form', 'originalProfile', 'lastName'], profile.originalProfile.lastName)
        .setIn(['form', 'originalProfile', 'phoneNumber'], profile.originalProfile.phoneNumber)
        .setIn(['form', 'originalProfile', 'email'], profile.originalProfile.email)
        .setIn(['form', 'originalProfile', 'thumbnail'], profile.originalProfile.thumbnail)
        .setIn(['form', 'originalProfile', 'objectId'], profile.originalProfile.objectId)
        .setIn(['form', 'originalProfile', 'emailVerified'], profile.originalProfile.emailVerified)
        .setIn(['form', 'fields', 'name'], profile.fields.name)
        .setIn(['form', 'fields', 'lastName'], profile.fields.lastName)
        .setIn(['form', 'fields', 'phoneNumber'], profile.fields.phoneNumber)
        .setIn(['form', 'fields', 'email'], profile.fields.email)
        .setIn(['form', 'fields', 'thumbnail'], profile.fields.thumbnail)
        .setIn(['form', 'fields', 'emailHasError'], profile.fields.emailHasError)
        .setIn(['form', 'fields', 'emailVerified'], profile.fields.emailVerified)
      return next

  }// switch
  /**
   * # Default
   */
  return state
}
