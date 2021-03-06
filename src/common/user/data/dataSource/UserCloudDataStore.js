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

  resetPassword(hash:string, data: UpdatePassword) {
    return this.userRestApi.resetPassword(hash, data);
  }

  sendVerifyEmail(email: string) {
    return this.userRestApi.sendVerifyEmail(email);
  }

  updatePassword(data: UpdatePassword) {
    return this.userRestApi.updatePassword(data)
  }

  updateProfile(profileId: string, data: Profile) {
    return this.userRestApi.updateProfile(profileId, data);
  }

  verifyUser(hash: string) {
    return this.userRestApi.verifyUser(hash);
  }
}

export default UserCloudDataStore;
