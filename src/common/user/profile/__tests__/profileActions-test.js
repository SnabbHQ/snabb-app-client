/**
 * # profileActions.js
 *
 * All the request actions have 3 variations, the request, a success
 * and a failure. They all follow the pattern that the request will
 * set the ```isFetching``` to true and the whether it's successful or
 * fails, setting it back to false.
 *
 */
'use strict'

/**
 * ## Class under test
 *
 */
import * as actions from'../actions/profileActions';

/**
 * ## Actions to test
 */
import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,

  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILURE,

  ON_PROFILE_FORM_FIELD_CHANGE

} from '../actions/ProfileActionTypes'

/**
 * ## Tests
 *
 * profileActions
 */
describe('profileActions', () => {
  /**
   * ### simple tests that prove the actions have the specific type
   */
  it('should getProfileRequest', () => {
    expect(actions.getUserProfile()).toEqual({type: GET_PROFILE_REQUEST})
  })

  it('should getProfileSuccess', () => {
    const json = {json: true}
    expect(actions.getProfileSuccess(json)).toEqual({
      type: GET_PROFILE_SUCCESS,
      payload: json
    })
  })

  it('should getProfileFailure', () => {
    const json = {json: true}
    expect(actions.getProfileFailure(json)).toEqual({
      type: GET_PROFILE_FAILURE,
      payload: json
    })
  })

  it('should profileUpdateRequest', () => {
    const userId = 'userId'
    const json = {json: true}
    const sessionToken = 'sessionToken'
    expect(actions.updateUserProfile(userId, json, sessionToken)).toEqual({
      type: PROFILE_UPDATE_REQUEST,
      payload: {
        data: {
          userId: userId,
          newUserData: json,
          sessionToken: sessionToken
        }
      }
    })
  })

  it('should profileUpdateSuccess', () => {
    expect(actions.profileUpdateSuccess()).toEqual({type: PROFILE_UPDATE_SUCCESS})
  })

  it('should profileUpdateFailure', () => {
    const json = {json: true}
    expect(actions.profileUpdateFailure(json)).toEqual({
      type: PROFILE_UPDATE_FAILURE,
      payload: json
    })
  })

  it('should onProfileFormFieldChange', () => {
    let field = 'field'
    let value = 'value'
    expect(actions.onProfileFormFieldChange(field, value)).toEqual({
      type: ON_PROFILE_FORM_FIELD_CHANGE, payload: {field: field, value: value}
    })
  })
})
