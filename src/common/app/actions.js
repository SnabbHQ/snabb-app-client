/* @flow */
import type { Action, Deps, Profile } from '../types';
import { Observable } from 'rxjs/Observable';
import { REHYDRATE } from 'redux-persist/constants';
import { silentLoginSuccess } from '../auth/actions';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

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

export const appStarted = (profile: Profile): Action => ({
  type: 'APP_STARTED',
  payload: { profile }
});

export const appStop = (): Action => ({
  type: 'APP_STOP',
});

export const appStorageLoaded = (state: Object): Action => ({
  type: 'APP_STORAGE_LOADED',
  payload: { state },
});

const appStartEpic = (action$: any, { authRepository, userRepository, snabbApi }: Deps) => {
  return action$.ofType(REHYDRATE)
    .switchMap(() => authRepository.getToken())
    .map(sessionToken => { snabbApi.setSessionToken(sessionToken) } )
    .switchMap(() => userRepository.getProfile())
    .map(appStarted)
    .onErrorResumeNext(appStarted);
};

const appStartedEpic = (action$: any, deps: Deps) => {
  const { getState } = deps;

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
