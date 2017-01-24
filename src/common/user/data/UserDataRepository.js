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

  sendVerifyEmail(email: string) {
    return this.userDataStoreFactory.createCloudDataStore().sendVerifyEmail(email);
  }

  updatePassword(profileId: string, data: UpdatePassword) {
    return this.userDataStoreFactory.createCloudDataStore().updateProfile(profileId, data);
  }

  updateProfile(profileId: string, data: Profile) {
    return this.userDataStoreFactory.createCloudDataStore().updateProfile(profileId, data);
  }
}

export default UserDataRepository;
