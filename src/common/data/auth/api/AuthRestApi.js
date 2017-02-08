import SnabbApi from '../../../lib/api/SnabbApi';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/do';

export default class AuthRestApi {

  constructor(snabbApi: SnabbApi, storageEngine) {
    this.snabbApi = snabbApi;
    this.storageEngine = storageEngine;
  }

  auth(username: string, password: string) {
    return Observable.fromPromise(this.snabbApi.auth({ username, password }))
      .do((sessionData) => {
          if (this.storageEngine)  {
            this.storageEngine.setItem('Snabb:sessionData', sessionData)
          }
        });
  }

  logout() {
    return Observable.fromPromise(this.snabbApi.logout())
      .do(() => this.storageEngine.removeItem('Snabb:sessionData'));
  }
}
