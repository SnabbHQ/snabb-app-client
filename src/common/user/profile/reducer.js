/**
 * # profileReducer.js
 *
 * The reducer user profile actions
 */
import type { Action, UserState } from '../../types';
import fieldValidation from '../../lib/fieldValidation';
import formValidation from './formValidation';
import * as ActionTypes from './actions/ProfileActionTypes';
import InitialState from './initialState';

/**
 * ## Actions
 *
 */
const {
  LOGOUT_SUCCESS,
  SET_STATE,
} = require('../../../common/lib/constants').default;

const initialState = new InitialState();

/**
 * ## profileReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
const reducer = (state: UserState = initialState,
                 action: Action): UserState => {
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
        .setIn(['form', 'updated'], false);

    /**
     * ### Request end successfully
     * set the form to fetching as done
     */
    case ActionTypes.PROFILE_UPDATE_SUCCESS:
      return state.setIn(['form', 'isFetching'], false)
        .setIn(['form', 'updated'], true);

    /**
     * ### Request ends successfully
     *
     * the fetching is done, set the UI fields and the profile
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
        .setIn(['form', 'error'], null)
        .setIn(['profile', 'id'], action.payload.id)
        .setIn(['profile', 'name'], action.payload.name)
        .setIn(['profile', 'lastName'], action.payload.lastName)
        .setIn(['profile', 'phoneNumber'], action.payload.phoneNumber)
        .setIn(['profile', 'email'], action.payload.email)
        .setIn(['profile', 'thumbnail'], action.payload.thumbnail)
        .setIn(['profile', 'emailVerified'], action.payload.emailVerified);

      return formValidation(
        fieldValidation(nextProfileState, action)
        , action);

    /**
     * User logged out, so reset form fields and original profile.
     *
     */
    case LOGOUT_SUCCESS:
      nextProfileState = state.remove('form')
        .remove('profile');

      return formValidation(nextProfileState, action);

    /**
     * ### Request fails
     * we're done fetching and the error needs to be displayed to the user
     */
    case ActionTypes.GET_PROFILE_FAILURE:
    case ActionTypes.PROFILE_UPDATE_FAILURE:
      return state.setIn(['form', 'isFetching'], false)
        .setIn(['form', 'error'], action.payload)
        .setIn(['form', 'updated'], false);

    /**
     * ### form fields have changed
     *
     * Set the state with the fields, clear the form error
     * and perform field and form validation
     */
    case ActionTypes.ON_PROFILE_FORM_FIELD_CHANGE: {
      const { field, value } = action.payload;
      const nextState = state.setIn(['form', 'fields', field], value)
        .setIn(['form', 'error'], null)
        .setIn(['form', 'updated'], false);

      return formValidation(fieldValidation(nextState, action), action);
    }

    /**
     * ### set the state
     *
     * This is in support of Hot Loading - take the payload
     * and set the values into the state
     *
     */
    case SET_STATE: {
      const profile = JSON.parse(action.payload).profile.form;
      return state.setIn(['form', 'disabled'], profile.disabled)
        .setIn(['form', 'error'], profile.error)
        .setIn(['form', 'isValid'], profile.isValid)
        .setIn(['form', 'isFetching'], profile.isFetching)
        .setIn(['form', 'fields', 'name'], profile.fields.name)
        .setIn(['form', 'fields', 'lastName'], profile.fields.lastName)
        .setIn(['form', 'fields', 'phoneNumber'], profile.fields.phoneNumber)
        .setIn(['form', 'fields', 'email'], profile.fields.email)
        .setIn(['form', 'fields', 'thumbnail'], profile.fields.thumbnail)
        .setIn(['form', 'fields', 'emailHasError'], profile.fields.emailHasError)
        .setIn(['form', 'fields', 'emailVerified'], profile.fields.emailVerified)
        .setIn(['profile', 'name'], profile.profile.name)
        .setIn(['profile', 'lastName'], profile.profile.lastName)
        .setIn(['profile', 'phoneNumber'], profile.profile.phoneNumber)
        .setIn(['profile', 'email'], profile.profile.email)
        .setIn(['profile', 'thumbnail'], profile.profile.thumbnail)
        .setIn(['profile', 'objectId'], profile.profile.objectId)
        .setIn(['profile', 'emailVerified'], profile.profile.emailVerified);
    }

    default:
      return state;
  }
};

export default reducer;
