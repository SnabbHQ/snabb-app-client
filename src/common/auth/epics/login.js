// @flow
import type { Deps } from '../../types';

import { loginSuccess, loginFail } from '../actions';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const validateEmailAndPassword = (validate, fields) => validate(fields)
  .prop('email')
  .required()
  .email()
  .prop('password')
  .required()
  .simplePassword()
  .promise;

const login = (action$: any, { backendFactory, appAuthToken, validate }: Deps) =>
  action$.ofType('LOG_IN')
    .map(action => action.payload.options)
    .mergeMap((options) => {
      const { email, password } = options;
      return Observable.fromPromise(validateEmailAndPassword(validate, { email, password }))
        .switchMap(() => Observable.fromPromise(backendFactory.login({ email, password })))
        .map(json => appAuthToken.storeSessionToken(appAuthToken, json))
        .switchMap(() => Observable.fromPromise(backendFactory.getProfile()))
        .map(loginSuccess)
        .catch(error => Observable.of(loginFail(error)));
    });

export default login;
