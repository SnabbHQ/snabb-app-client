// @flow
import type { Profile, Register } from '../../types';
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
    return this.userDataStoreFactory.create().register(data);
  }

  forgotPassword(email: string) {
    return this.userDataStoreFactory.createCloudDataStore().forgotPassword(email);
  }

  updateProfile(profileId: string, data: Profile) {
    return this.userDataStoreFactory.create().updateProfile(profileId, data);
  }
}

export default UserDataRepository;
