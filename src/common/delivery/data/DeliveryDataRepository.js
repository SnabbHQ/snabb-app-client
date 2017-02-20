// @flow
import DeliveryDataStoreFactory from './dataSource/DeliveryDataStoreFactory';

class DeliveryDataRepository {
  deliveryDataStoreFactory: DeliveryDataStoreFactory;

  constructor(deliveryDataStoreFactory: DeliveryDataStoreFactory) {
    this.deliveryDataStoreFactory = deliveryDataStoreFactory;
  }

  validateAddress(address: string) {
    return this.deliveryDataStoreFactory.create().validateAddress(address);
  }
}

export default DeliveryDataRepository;
