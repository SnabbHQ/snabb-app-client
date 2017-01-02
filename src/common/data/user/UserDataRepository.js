// @flow
import UserRepository from '../../domain/UserRepository';
import UserDataStoreFactory from './dataSource/UserDataStoreFactory';

class UserDataRepository extends UserRepository {
  userDataStoreFactory: UserDataStoreFactory;

  constructor(userDataStoreFactory: UserDataStoreFactory) {
    super();

    this.userDataStoreFactory = userDataStoreFactory;
  }

  getProfile() {
    return this.userDataStoreFactory.create().getProfile();
  }
}

export default UserDataRepository;
