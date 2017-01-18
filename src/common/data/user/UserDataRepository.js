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

  updateProfile(profileId: string, data: Profile) {
    return this.userDataStoreFactory.create().updateProfile(profileId, data);
  }

  resetPassword(email: string) {
    return this.userDataStoreFactory.createCloudDataStore().resetPassword(email);
  }
}

export default UserDataRepository;
