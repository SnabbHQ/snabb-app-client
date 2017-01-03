// @flow
import UserDataStore from './UserDataStore';
import UserRestApi from '../api/UserRestApi';

class UserCloudDataStore extends UserDataStore {
  userRestApi: UserRestApi;

  constructor(userRestApi: UserRestApi) {
    super(userRestApi);

    this.userRestApi = userRestApi;
  }

  getProfile() {
    return this.userRestApi.getProfile();
  }
}

export default UserCloudDataStore;
