// @flow
import type { Profile, Register } from '../../../types';
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

  register(data: Register) {
    return this.userRestApi.register(data);
  }

  resetPassword(email: string) {
    return this.userRestApi.resetPassword(email);
  }

  updateProfile(profileId: string, data: Profile) {
    return this.userRestApi.updateProfile(profileId, data);
  }
}

export default UserCloudDataStore;
