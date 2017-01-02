import UserRepository from '../../domain/UserRepository';
import UserDataStoreFactory from './dataSource/UserDataStoreFactory';

class UserDataRepository extends UserRepository {
  userDataStoreFactory: UserDataStoreFactory;

  constructor() {
    super();

    this.userDataStoreFactory = new UserDataStoreFactory();
  }

  getUser(userName: string, password: string) {
    return this.userDataStoreFactory.create().getUser(userName, password);
  }
}

export default UserDataRepository;
