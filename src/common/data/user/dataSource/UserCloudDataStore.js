// @flow
import type { Profile, Register, UpdatePassword } from '../../../types';
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

  forgotPassword(email: string) {
    return this.userRestApi.forgotPassword(email);
  }

  updatePassword(profileId: string, data: UpdatePassword) {
    return this.userRestApi.updatePassword(profileId, data)
  }

  updateProfile(profileId: string, data: Profile) {
    return this.userRestApi.updateProfile(profileId, data);
  }
}

export default UserCloudDataStore;
