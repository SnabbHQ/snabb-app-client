// @flow
import UserCloudDataStore from './UserCloudDataStore';
import UserRestApi from '../api/UserRestApi';

export default class UserDataStoreFactory {
  userRestApi: UserRestApi;

  constructor(userRestApi: UserRestApi) {
    this.userRestApi = userRestApi;
  }

  create() {
    return this.createCloudDataStore();
  }

  createCloudDataStore() {
    return new UserCloudDataStore(this.userRestApi);
  }
}
