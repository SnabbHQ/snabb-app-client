// @flow
import type { Deps } from '../../types';
import { sendVerifyEmailSuccess, sendVerifyEmailFail } from '../actions';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const sendVerifyEmail = (action$: any, { userRepository }: Deps) =>
  action$.ofType('SEND_VERIFY_EMAIL')
    .map(action => action.payload.email)
    .mergeMap((email) => {
      return userRepository.sendVerifyEmail(email)
        .map(sendVerifyEmailSuccess)
        .catch(error => Observable.of(sendVerifyEmailFail(error)));
    });

export default sendVerifyEmail;
