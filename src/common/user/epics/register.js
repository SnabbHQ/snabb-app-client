// @flow
import type { Deps } from '../../types';

import { registerSuccess, registerFail } from '../actions';
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
  .prop('password')
  .required()
  .simplePassword()
  .promise;

const register = (action$: any, { authRepository, userRepository, validate }: Deps) =>
  action$.ofType('REGISTER')
    .map(action => action.payload.options)
    .mergeMap((options) => {
      const { companyName, email, phone, password } = options;
      return Observable.fromPromise(validateFields(validate, { companyName, phone, email, password }))
        .switchMap(() => userRepository.register({companyName, email, phone,  password }))
        .switchMap((profile) =>
          authRepository.auth(email, password)
          .map(() => registerSuccess(profile)))
        .catch(error => Observable.of(registerFail(error)));
    });

export default register;
