/* @flow weak */
import AuthDataRepository from './data/auth/AuthDataRepository';
import AuthDataStoreFactory from './data/auth/dataSource/AuthDataStoreFactory';
import AuthRestApi from './data/auth/api/AuthRestApi';
import DeliveryDataRepository from './delivery/data/DeliveryDataRepository';
import DeliveryDataStoreFactory from './delivery/data/dataSource/DeliveryDataStoreFactory';
import DeliveryRestApi from './delivery/data/api/DeliveryRestApi';
import SnabbApi from './lib/api/SnabbApi';
import UserDataRepository from './user/data/UserDataRepository';
import UserDataStoreFactory from './user/data/dataSource/UserDataStoreFactory';
import UserRestApi from './user/data/api/UserRestApi';
import validate from './validate';

// Ensure only one Data Instance instance.
let dataDeps = null;

const createDataDeps = (apiConfig, platformDeps) => {
  if (!dataDeps) {
    const snabbApi = new SnabbApi(apiConfig);

    const authRestApi = new AuthRestApi(snabbApi, platformDeps.storageEngine);
    const authDataStoreFactory = new AuthDataStoreFactory(authRestApi, platformDeps.storageEngine);

    const userRestApi = new UserRestApi(snabbApi);
    const userDataStoreFactory = new UserDataStoreFactory(userRestApi);

    const deliveryRestApi = new DeliveryRestApi(snabbApi);
    const deliveryDataStoreFactory = new DeliveryDataStoreFactory(deliveryRestApi);

    dataDeps = {
      authRepository: new AuthDataRepository(authDataStoreFactory),
      userRepository: new UserDataRepository(userDataStoreFactory),
      deliveryRepository: new DeliveryDataRepository(deliveryDataStoreFactory),
      snabbApi: snabbApi
    };
  }

  return dataDeps;
};

const configureDeps = (initialState, platformDeps) => ({
  ...platformDeps,
  ...createDataDeps(initialState.config.apiConfig, platformDeps),
  getUid: () => platformDeps.uuid.v4(),
  now: () => Date.now(),
  validate,
});

export default configureDeps;
