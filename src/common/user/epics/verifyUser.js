// @flow
import type { Deps } from '../../types';
import { verifyUserSucceess, verifyUserFail } from '../actions';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const verifyUser = (action$: any, { userRepository }: Deps) =>
  action$.ofType('VERIFY_USER')
    .map(action => action.payload.hash)
    .mergeMap((hash) => {
      return userRepository.verifyUser(hash)
        .map(verifyUserSucceess)
        .catch(error => Observable.of(verifyUserFail(error)));
    });

export default verifyUser;
