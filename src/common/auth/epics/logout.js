// @flow
import type { Deps } from '../../types';

import { logoutSucess } from '../actions';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const logout = (action$: any, { backendFactory, appAuthToken }: Deps) =>
  action$.ofType('LOG_OUT')
    .switchMap(() => Observable.fromPromise(backendFactory.logout())
      .map(appAuthToken.deleteSessionToken)
      .map(logoutSucess));

export default logout;
