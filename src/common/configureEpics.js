/* @flow weak */
import 'rxjs';
import { combineEpics } from 'redux-observable';
import { epics as appEpics } from './app/actions';
import { epics as authEpics } from './auth/epics';
import { epics as userEpics } from './user/epics';

const epics = [
  ...appEpics,
  ...authEpics,
  ...userEpics,
];

const configureEpics = (deps: Object) => (action$, { getState }) =>
  combineEpics(...epics)(action$, { ...deps, getState });

export default configureEpics;
