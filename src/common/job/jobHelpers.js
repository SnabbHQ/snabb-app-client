import includes from 'lodash/includes';
import { isPicking } from '../lib/deliveryHelpers';
import {
  ACTIVE_JOB_STATUSES,
  PENDING_JOB_STATUSES,
  SCHEDULED_JOB_STATUSES
} from '../constants';

export function isActive({ status }) {
  return includes(ACTIVE_JOB_STATUSES, status);
}

export function isScheduled({ status }) {
  return includes(SCHEDULED_JOB_STATUSES, status);
}

export function isPending({ status }) {
  return includes(PENDING_JOB_STATUSES, status);
}

export function isCancellable({ status, currentDelivery: d }) {
  return includes(PENDING_JOB_STATUSES, status) || (d && isPicking(d));
}

export function getFlatStatus({ status, currentDelivery: d }) {
  return status === 'in_progress' ? d.status : status;
};
