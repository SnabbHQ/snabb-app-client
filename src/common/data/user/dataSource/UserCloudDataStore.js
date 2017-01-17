// @flow
import type { Profile } from '../../../types';
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

  updateProfile(data: Profile) {
    return this.userRestApi.updateProfile(data);
  }

  resetPassword(email: string) {
    return this.userRestApi.resetPassword(email);
  }
}

export default UserCloudDataStore;
