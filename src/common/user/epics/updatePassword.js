// @flow
import type { Deps } from '../../types';

import { updatePasswordSuccess, updatePasswordFail} from '../actions';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const validateFields = (validate, fields) => validate(fields)
  .prop('currentPassword')
  .required()
  .simplePassword()
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
const updatePassword = (action$: any, { userRepository, validate }: Deps) =>
  action$.ofType('PASSWORD_UPDATE')
    .map(action => action.payload)
    .mergeMap(({ options }) => {
      const fields = { currentPassword, newPassword, newPasswordConfirmation } = options;

      return Observable.fromPromise(validateFields(validate, fields))
        .switchMap(() => userRepository.updatePassword({
            currentPassword: fields.currentPassword,
            newPassword: fields.newPassword
          })
        )
        .map(updatePasswordSuccess)
        .catch(error => Observable.of(updatePasswordFail(error)));
    });

export default updatePassword;

