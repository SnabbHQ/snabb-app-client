// @flow
import AuthRepository from '../../domain/AuthRepository';
import AuthDataStoreFactory from './dataSource/AuthDataStoreFactory';

class AuthDataRepository extends AuthRepository {
  authDataStoreFactory: AuthDataStoreFactory;

  constructor(authDataStoreFactory: AuthDataStoreFactory) {
    super();

    this.authDataStoreFactory = authDataStoreFactory;
  }

  auth(username: string, password: string) {
    return this.authDataStoreFactory.createCloudDataStore().auth(username, password);
  }
}

export default AuthDataRepository;
