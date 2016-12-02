/* @flow weak */
import 'rxjs';
import { combineEpics } from 'redux-observable';
import { epics as appEpics } from './app/actions';

const epics = [
  ...appEpics,
];

const configureEpics = (deps: Object) => (action$, { getState }) =>
  combineEpics(...epics)(action$, { ...deps, getState });

export default configureEpics;
