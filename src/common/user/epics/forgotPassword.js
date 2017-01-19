// @flow
import type { Deps } from '../../types';

import { forgotPasswordSuccess, forgotPasswordFail } from '../actions';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const validateEmail = (validate, fields) => validate(fields)
  .prop('email')
  .required()
  .email()
  .promise;

const forgotPassword = (action$: any, { userRepository, validate }: Deps) =>
  action$.ofType('FORGOT_PASSWORD')
    .map(action => action.payload.options)
    .mergeMap((options) => {
      const { email } = options;
      return Observable.fromPromise(validateEmail(validate, { email }))
        .switchMap(() => userRepository.forgotPassword(email))
        .map(forgotPasswordSuccess)
        .catch(error => Observable.of(forgotPasswordFail(error)));
    });

export default forgotPassword;
