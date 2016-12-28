// @flow
import type { Deps } from '../../types';

import { loginSuccess, loginFail } from '../actions';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const getSessionToken = (action$: any, { backendFactory, appAuthToken, validate }: Deps) =>
  action$.ofType('SESSION_TOKEN')
    .map(action => action.payload.options)
    .mergeMap((options) => {
      const { email, password } = options;
      return Observable.fromPromise(validateEmailAndPassword(validate, { email, password }))
        .switchMap(() => Observable.fromPromise(backendFactory.login({ email, password })))
        .map(json => appAuthToken.storeSessionToken(appAuthToken, json))
        .map(loginSuccess)
        .catch(error => Observable.of(loginFail(error)));
    });

export default getSessionToken;
