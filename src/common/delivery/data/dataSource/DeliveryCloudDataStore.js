// @flow
import DeliveryDataStore from './DeliveryDataStore';
import DeliveryRestApi from '../api/DeliveryRestApi';

class DeliverCloudDataStore extends DeliveryDataStore {
  deliveryRestApi: DeliveryRestApi;

  constructor(deliveryRestApi: DeliveryRestApi) {
    super(deliveryRestApi);

    this.deliveryRestApi = deliveryRestApi;
  }

  createQuote(tasks: Array<Object>) {
    return this.deliveryRestApi.createQuote(tasks);
  }

  newDelivery(quoteId: string, selectedPackageId: string) {
    return this.deliveryRestApi.newDelivery(quoteId, selectedPackageId);
  }

  validateAddress(address: string) {
    return this.deliveryRestApi.validateAddress(address);
  }
}

export default DeliverCloudDataStore;
