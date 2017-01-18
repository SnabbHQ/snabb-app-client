// @flow
import type { Deps } from '../../../types';

import { profileUpdateSuccess, profileUpdateFailure } from '../actions';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const validateFields = (validate, fields) => validate(fields)
  .prop('name')
  .required()
  .prop('phone')
  .required()
  .phone()
  .prop('email')
  .required()
  .email()
  .promise;

/**
 * Update the user's profile information.
 * @param action$
 * @param userRepository
 * @param validate
 */
const updateProfile = (action$: any, { userRepository, validate }: Deps) =>
  action$.ofType('PROFILE_UPDATE')
    .map(action => action.payload.options)
    .mergeMap((options) => {
      const { email, name, phone } = options;
      return Observable.fromPromise(validateFields(validate, { name, email, phone }))
        .switchMap(() => userRepository.updateProfile(options))
        .map(profileUpdateSuccess)
        .catch(error => Observable.of(profileUpdateFailure(error)));
    });

export default updateProfile;

