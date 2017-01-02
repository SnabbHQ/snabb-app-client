/* @flow weak */
import AuthDataRepository from './data/auth/AuthDataRepository';
import AuthDataStoreFactory from './data/auth/dataSource/AuthDataStoreFactory';
import AuthRestApi from './data/auth/api/AuthRestApi';
import validate from './validate';
import SnabbApi from './data/SnabbApi';
import UserDataRepository from './data/user/UserDataRepository';
import UserDataStoreFactory from './data/user/dataSource/UserDataStoreFactory';
import UserRestApi from './data/user/api/UserRestApi';

// Ensure only one Data Instance instance.
let dataDeps = null;

const createDataDeps = (apiConfig) => {
  if (!dataDeps) {
    const snabbApi = new SnabbApi(apiConfig);
    const authRestApi = new AuthRestApi(snabbApi);
    const authDataStoreFactory = new AuthDataStoreFactory(authRestApi);

    const userRestApi = new UserRestApi(snabbApi);
    const userDataStoreFactory = new UserDataStoreFactory(userRestApi);

    dataDeps = {
      authRepository: new AuthDataRepository(authDataStoreFactory),
      userRepository: new UserDataRepository(userDataStoreFactory),
    };
  }

  return dataDeps;
};

const configureDeps = (initialState, platformDeps) => ({
  ...platformDeps,
  ...createDataDeps(initialState.config.apiConfig),
  getUid: () => platformDeps.uuid.v4(),
  now: () => Date.now(),
  validate,
});

export default configureDeps;
