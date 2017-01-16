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
  .prop('name')
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

const login = (action$: any, { authRepository, userRepository, validate }: Deps) =>
  action$.ofType('REGISTER')
    .map(action => action.payload.options)
    .mergeMap((options) => {
      const { name, email, phone, password } = options;
      return Observable.fromPromise(validateFields(validate, { name, phone, email, password }))
        .switchMap(() => authRepository.auth(email, password))
        .switchMap(() => userRepository.getProfile())
        .map(registerSuccess)
        .catch(error => Observable.of(registerFail(error)));
    });

export default login;
