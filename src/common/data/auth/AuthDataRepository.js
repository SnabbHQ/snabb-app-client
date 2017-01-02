// @flow
import AuthRepository from '../../domain/AuthRepository';
import AuthDataStoreFactory from './dataSource/AuthDataStoreFactory';

class AuthDataRepository extends AuthRepository {
  authDataStoreFactory: AuthDataStoreFactory;

  constructor() {
    super();

    // TODO - For now use here (with out DI)
    this.authDataStoreFactory = new AuthDataStoreFactory();
  }

  auth(username: string, password: string) {
    return this.authDataStoreFactory.createCloudDataStore().auth(username, password);
  }
}

export default AuthDataRepository;
