/**
 * Collection of tests for all profile epics defined
 */


//jest.mock('../../lib/api/SnabbApi');

import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import SnabbApi from '../../lib/api/SnabbApi';
import UserDataRepository from '../../user/data/UserDataRepository';
import UserDataStoreFactory from '../../user/data/dataSource/UserDataStoreFactory';
import UserRestApi from '../../user/data/api/UserRestApi';
import { epics as userEpics } from '../epics';
import getProfile from '../epics/getProfile';
import * as actions from '../actions';

const userRestApi = new UserRestApi(new SnabbApi({ apiConfig: '',  clientId: ''}));
const userDataStoreFactory = new UserDataStoreFactory(userRestApi);
const dataRepo = new UserDataRepository(userDataStoreFactory);

import { Observable } from 'rxjs';



const data = {
  getProfile() {
    return Observable.fromPromise(new Promise(function(resolve, reject) {
        resolve({ userId: '' })
    }));
  }
};

const configureEpics = (deps: Object) => (action$, { getState }) =>
  combineEpics(getProfile)(action$, { ...deps, getState });

const rootEpic = configureEpics({ userRepository: data});
const epicMiddleware = createEpicMiddleware(rootEpic);
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
    fetchMock.restore();
    epicMiddleware.replaceEpic(getProfile);
  });

  // it('should getProfile', () => {
  //   fetchMock.get('*', {});
  //
  //   store.dispatch(actions.getProfile());
  //
  //   expect(store.getActions()).toEqual([
  //     { type: 'GET_PROFILE' },
  //     { type: 'GET_PROFILE_SUCCESS' },
  //   ]);
  // });

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
