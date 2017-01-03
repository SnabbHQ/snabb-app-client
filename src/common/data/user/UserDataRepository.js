// @flow
import UserDataStoreFactory from './dataSource/UserDataStoreFactory';

class UserDataRepository {
  userDataStoreFactory: UserDataStoreFactory;

  constructor(userDataStoreFactory: UserDataStoreFactory) {
    this.userDataStoreFactory = userDataStoreFactory;
  }

  getProfile() {
    return this.userDataStoreFactory.create().getProfile();
  }
}

export default UserDataRepository;
