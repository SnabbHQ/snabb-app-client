// @flow
import type { Deps } from '../../types';

import { logOutSuccess } from '../actions';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const logout = (action$: any, { authRepository }: Deps) =>
  action$.ofType('LOG_OUT')
    .switchMap(() => authRepository.logout())
      .map(logOutSuccess);

export default logout;
