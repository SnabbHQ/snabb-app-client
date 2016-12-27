// @flow
import type { Action, Deps } from '../../types';
import BackendFactory from '../../lib/BackendFactory';
import AppAuthToken from '../../lib/__mocks__/AppAuthToken';

import { logInSuccess, logInFail } from '../actions';

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

/**
 * ## saveSessionToken
 * @param {Object} json - object with sessionToken
 */
export function saveSessionToken(json) {
  return new AppAuthToken().storeSessionToken(json);
}

const logIn = (action$: any, { validate }: Deps) =>
  action$.ofType('LOG_IN')
    .map(action => action.payload.options)
    .mergeMap((options) => {
      const { email, password } = options;
      Observable.fromPromise(validateEmailAndPassword(validate, { email, password }))
        .switchMap(() => Observable.fromPromise(
          BackendFactory().logIn({ email, password })),
        )
        .map((json) => (
          saveSessionToken();
          logInSuccess(json);
        ))
        .catch(error => Observable.of(logInFail(error)));
    });

export default logIn;
