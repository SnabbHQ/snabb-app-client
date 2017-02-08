/* @flow */
import type { Action, Deps } from '../types';
import { Observable } from 'rxjs/Observable';
import { REHYDRATE } from 'redux-persist/constants';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export const appShowMessage = (messageShown: boolean): Action => ({
  type: 'APP_SHOW_MESSAGE',
  payload: { messageShown },
});

export const appError = (error: Object): Action => ({
  type: 'APP_ERROR',
  payload: { error },
});

export const appOnline = (online: boolean): Action => ({
  type: 'APP_ONLINE',
  payload: { online },
});

export const appShowMenu = (menuShown: boolean): Action => ({
  type: 'APP_SHOW_MENU',
  payload: { menuShown },
});

// Called on componentDidMount aka only at the client (browser or native).
export const appStart = (): Action => ({
  type: 'APP_START',
});

export const appStarted = (): Action => ({
  type: 'APP_STARTED',
});

export const appStop = (): Action => ({
  type: 'APP_STOP',
});

export const appStorageLoaded = (state: Object): Action => ({
  type: 'APP_STORAGE_LOADED',
  payload: { state },
});

// TODO: Observable type.
const appStartEpic = (action$: any) => {
  return action$.ofType(REHYDRATE)
    .map(appStarted);
};

const appStartedEpic = (action$: any, deps: Deps) => {
  const { getState, storageEngine, snabbApi } = deps;

  const appOnline$ = Observable.create((observer) => {
    const onValue = (snap) => {
      const online = snap.val();
      if (online === getState().app.online) return;
      observer.next(appOnline(online));
    };
    return () => {};
  });

  const streams = [
    appOnline$,
  ];

  return action$
    .filter((action: Action) => action.type === 'APP_STARTED')
    .mergeMap(() => Observable
      .merge(...streams)
      .switchMap(Observable.fromPromise(storageEngine.getItem('Snabb:sessionData'))
        .map((sessionData) => snabbApi.setSessionToken(sessionData)))
      // takeUntil unsubscribes all merged streams on APP_STOP.
      .takeUntil(
        action$.filter((action: Action) => action.type === 'APP_STOP'),
      ),
    );
};

export const epics = [
  appStartEpic,
  appStartedEpic,
];
