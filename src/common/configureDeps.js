/* @flow weak */
import validate from './validate';
import BackendFactory from './lib/BackendFactory';
import AppAuthToken from './lib/__mocks__/AppAuthToken';

const createBackendDeps = () => ({
  backendFactory: new BackendFactory(),
  appAuthToken: new AppAuthToken(),
});

const configureDeps = (initialState, platformDeps) => ({
  ...platformDeps,
  ...createBackendDeps(),
  getUid: () => platformDeps.uuid.v4(),
  now: () => Date.now(),
  validate,
});

export default configureDeps;
