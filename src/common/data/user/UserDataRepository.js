// @flow
import type { Profile } from '../../types';
import UserDataStoreFactory from './dataSource/UserDataStoreFactory';

class UserDataRepository {
  userDataStoreFactory: UserDataStoreFactory;

  constructor(userDataStoreFactory: UserDataStoreFactory) {
    this.userDataStoreFactory = userDataStoreFactory;
  }

  getProfile() {
    return this.userDataStoreFactory.create().getProfile();
  }

  updateProfile(data: Profile) {
    return this.userDataStoreFactory.create().updateProfile(data);
  }

  resetPassword(email: string) {
    return this.userDataStoreFactory.createCloudDataStore().resetPassword(email);
  }
}

export default UserDataRepository;
