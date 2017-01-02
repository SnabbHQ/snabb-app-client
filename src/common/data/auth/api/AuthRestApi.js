import SnabbApi from '../../SnabbApi';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/fromPromise';

export default class UserRestApi {

  constructor(snabbApi: SnabbApi) {
    this.snabbApi = snabbApi;
  }

  auth(username: string, password: string) {
    return Observable.fromPromise(this.snabbApi.auth({ username, password }));
  }
}
