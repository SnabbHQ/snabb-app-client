// @flow
import type { Profile, Register, UpdatePassword } from '../../types';
import UserDataStoreFactory from './dataSource/UserDataStoreFactory';

class UserDataRepository {
  userDataStoreFactory: UserDataStoreFactory;

  constructor(userDataStoreFactory: UserDataStoreFactory) {
    this.userDataStoreFactory = userDataStoreFactory;
  }

  getProfile() {
    return this.userDataStoreFactory.create().getProfile();
  }

  register(data: Register) {
    return this.userDataStoreFactory.createCloudDataStore().register(data);
  }

  forgotPassword(email: string) {
    return this.userDataStoreFactory.createCloudDataStore().forgotPassword(email);
  }

  resetPassword(hash:string, data: UpdatePassword) {
    return this.userDataStoreFactory.createCloudDataStore().resetPassword(hash, data);
  }

  sendVerifyEmail(email: string) {
    return this.userDataStoreFactory.createCloudDataStore().sendVerifyEmail(email);
  }

  updatePassword(data: UpdatePassword) {
    return this.userDataStoreFactory.createCloudDataStore().updatePassword(data);
  }

  updateProfile(profileId: string, data: Profile) {
    return this.userDataStoreFactory.createCloudDataStore().updateProfile(profileId, data);
  }

  verifyUser(hash: string) {
    return this.userDataStoreFactory.createCloudDataStore().verifyUser(hash);
  }
}

export default UserDataRepository;
