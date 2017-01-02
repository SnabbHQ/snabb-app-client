// @flow
import UserDataStore from './UserDataStore';
import UserRestApi from '../api/UserRestApi';

class UserCloudDataStore extends UserDataStore {
  userRestApi: UserRestApi;

  constructor(userRestApi: UserRestApi) {
    super(userRestApi);

    this.userRestApi = userRestApi;
  }

  getUser(userName: string, password: string) {
    return this.userRestApi.login(userName, password);
  }
}

export default UserCloudDataStore;
