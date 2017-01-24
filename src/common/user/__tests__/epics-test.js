/**
 * Collection of tests for all profile epics defined
 */


jest.mock('../../lib/SnabbApi');

import configureMockStore from 'redux-mock-store';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import UserDataRepository from '../../data/user/UserDataRepository';
import { epics as userEpics } from '../epics';
import * as actions from '../actions';

let rootEpic = combineEpics(userEpics);

const deps = {
  userDataRepository: new UserDataRepository(),
};

let getProfile = userEpics[0]()(deps);

const epicMiddleware = createEpicMiddleware(getProfile);
const mockStore = configureMockStore([epicMiddleware]);

/**
 * ## Tests
 *
 * User epics
 */
describe('All User epics', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    epicMiddleware.replaceEpic(getProfile);
  });

  it('should getProfile', () => {
    store.dispatch(actions.getProfile());

    expect(store.getActions()).toEqual([
      { type: 'GET_PROFILE' },
      { type: 'GET_PROFILE_SUCCESS' },
    ]);
  });

  // it('should updateProfile', () => {
  //   const expectedActions = [
  //     { type: 'GET' },
  //     { type: PROFILE_UPDATE_SUCCESS },
  //   ];
  //
  //   store.dispatch(actions.updateUserProfile('userId', {}, 'sessionToken'));
  //
  //   expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
  //   expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
  // });
});
