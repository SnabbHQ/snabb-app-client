// @flow
import type { Deps } from '../../types';

import { loginSuccess, loginFail } from '../actions';
import { Observable } from 'rxjs/Observable';
import AuthDataRepository from '../../data/auth/AuthDataRepository';
import UserDataRepository from '../../data/user/UserDataRepository';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const silentLogin = (action$: any, {}: Deps) =>
  action$.ofType('SILENT_LOG_IN')
    .mergeMap(() => new AuthDataRepository().getToken())
      .switchMap(() => new UserDataRepository().getProfile())
      .map(loginSuccess)
      .catch(error => Observable.of(loginFail(error)));

export default silentLogin;
