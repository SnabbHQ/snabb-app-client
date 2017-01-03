// @flow
import AuthDataStoreFactory from './dataSource/AuthDataStoreFactory';

class AuthDataRepository {
  authDataStoreFactory: AuthDataStoreFactory;

  constructor(authDataStoreFactory: AuthDataStoreFactory) {
    this.authDataStoreFactory = authDataStoreFactory;
  }

  auth(username: string, password: string) {
    return this.authDataStoreFactory.createCloudDataStore().auth(username, password);
  }
}

export default AuthDataRepository;
