// @flow
import DeliveryCloudDataStore from './DeliveryCloudDataStore';
import DeliveryRestApi from '../api/DeliveryRestApi';

export default class UserDataStoreFactory {
  deliveryRestApi: DeliveryRestApi;

  constructor(deliveryRestApi: DeliveryRestApi) {
    this.deliveryRestApi = deliveryRestApi;
  }

  create() {
    return this.createCloudDataStore();
  }

  createCloudDataStore() {
    return new DeliveryCloudDataStore(this.deliveryRestApi);
  }
}
