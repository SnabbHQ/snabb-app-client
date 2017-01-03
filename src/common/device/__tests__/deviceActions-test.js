/**
 * # deviceActions-test.js
 *
 * This test is for deviceActions
 *
 */


/**
 * ## Mocks
 *
 * We don't want to use the devices storage, nor actually call
 * the server
 *
 */
jest.mock('../../../lib/AppAuthToken');
jest.mock('../../../lib/BackendFactory');

/**
 * ## Class under test
 *
 */
const actions = require('../deviceActions');

/**
 * ## Imports
 *
 * actions under test
 */
const {
  SET_PLATFORM,
  SET_VERSION,
} = require('../.././constants').default;

/**
 * ## Tests
 *
 * deviceActions
 */
describe('deviceActions', () => {
  it('should setPlatform', () => {
    const platform = 'ios';
    expect(actions.setPlatform(platform)).toEqual({
      type: SET_PLATFORM,
      payload: platform,
    });
  });

  it('should setVersion', () => {
    const version = '0.0.8';
    expect(actions.setVersion(version)).toEqual({
      type: SET_VERSION,
      payload: version,
    });
  });
});

