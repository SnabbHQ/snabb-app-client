// @flow
import type { Deps } from '../../../types';

import { updateProfileSuccess, updateProfileFail } from '../actions';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const validateFields = (validate, fields) => validate(fields)
  .prop('companyName')
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
    .map(action => action.payload)
    .mergeMap((profileId, options) => {
      const { email, companyName, phone } = options;
      return Observable.fromPromise(validateFields(validate, { companyName, email, phone }))
        .switchMap((profile) => userRepository.updateProfile(profileId, { companyName, email, phone } ))
        .map(updateProfileSuccess)
        .catch(error => Observable.of(updateProfileFail(error)));
    });

export default updateProfile;

