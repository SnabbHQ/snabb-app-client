import includes from 'lodash/includes';

const PICKING_STATUSES = [
  'almost_picking',
  'waiting_at_pickup',
  'picking'
];

const DELIVERING_STATUSES = [
  'almost_delivering',
  'waiting_at_dropoff',
  'delivering'
];

export function isPicking(delivery) {
  return includes(PICKING_STATUSES, delivery.status);
}

export function isDelivering(delivery) {
  return includes(DELIVERING_STATUSES, delivery.status);
}
