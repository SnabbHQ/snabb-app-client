// @flow
import type { Deps } from '../../types';

import { resetPasswordSuccess, resetPasswordFail } from '../actions';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const validateFields = (validate, fields) => validate(fields)
  .prop('newPassword')
  .required()
  .simplePassword()
  .prop('newPasswordConfirmation')
  .required()
  .equalPasswords()
  .promise;

/**
 * Update the user's profile information.
 * @param action$
 * @param userRepository
 * @param validate
 */
const resetPassword = (action$: any, { userRepository, validate }: Deps) =>
  action$.ofType('PASSWORD_RESET')
    .map(action => action.payload)
    .mergeMap(({ hash, options }) => {
      const fields = { newPassword, newPasswordConfirmation } = options;

      return Observable.fromPromise(validateFields(validate, fields))
        .switchMap(() => userRepository.resetPassword(hash, { password: fields.newPassword }))
        .map(resetPasswordSuccess)
        .catch(error => Observable.of(resetPasswordFail(error)));
    });

export default resetPassword;

