// @flow
import UserRepository from '../../domain/UserRepository';
import UserDataStoreFactory from './dataSource/UserDataStoreFactory';

class UserDataRepository extends UserRepository {
  userDataStoreFactory: UserDataStoreFactory;

  constructor() {
    super();

    this.userDataStoreFactory = new UserDataStoreFactory();
  }

  getProfile() {
    return this.userDataStoreFactory.create().getProfile();
  }
}

export default UserDataRepository;
