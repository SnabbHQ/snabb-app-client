/**
 * Collection of tests for all profile epics defined
 */
'use strict'

jest.mock('../../../../lib/BackendFactory')
jest.mock('react-native-router-flux')


import configureMockStore from 'redux-mock-store'
import { createEpicMiddleware } from 'redux-observable'
import profileRootEpics from '../epics'
import * as actions from '../actions/profileActions'


/**
 * ## Actions to test
 */
import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,

  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
} from '../actions/ProfileActionTypes'

const epicMiddleware = createEpicMiddleware(profileRootEpics)
const mockStore = configureMockStore([epicMiddleware]);


/**
 * ## Tests
 *
 * profileEpics
 */
describe('profileEpics', () => {

  let store

  beforeEach(() => {
    store = mockStore()
  })

  afterEach(() => {
    epicMiddleware.replaceEpic(profileRootEpics)
  })

  /**
   * ### Rxjs tests
   *
   * the following tests describe the actions that should be
   * dispatched the function is invoked
   *
   */
  it('should getProfile', () => {

    store.dispatch(actions.getUserProfile())

    expect(store.getActions()).toEqual([
      {type: GET_PROFILE_REQUEST},
      {type: GET_PROFILE_SUCCESS}
    ])
  })

  it('should updateProfile', () => {
    const expectedActions = [
      {type: PROFILE_UPDATE_REQUEST},
      {type: PROFILE_UPDATE_SUCCESS},
    ]

    store.dispatch(actions.updateUserProfile('userId', {}, 'sessionToken'))

    expect(store.getActions()[0].type).toEqual(expectedActions[0].type)
    expect(store.getActions()[1].type).toEqual(expectedActions[1].type)
  })
})
