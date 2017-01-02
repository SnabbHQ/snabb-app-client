// @flow
import UserCloudDataStore from './UserCloudDataStore';
import UserRestApi from '../api/UserRestApi';
import SnabbApi from '../../../lib/SnabbApi';

export default class UserDataStoreFactory {
  userRestApi: UserRestApi;

  constructor() {
    // TODO - Lets start without DI
    this.userRestApi = new UserRestApi(new SnabbApi());
  }

  create() {
    return this.createCloudDataStore();
  }

  createCloudDataStore() {
    return new UserCloudDataStore(this.userRestApi);
  }
}
