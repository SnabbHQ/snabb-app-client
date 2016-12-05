import map from 'lodash/map';
import reduce from 'lodash/reduce';
import { TRANSPORT_TYPES } from '../../lib/constants';
import { CLOSEST_DRIVERS_SUCCESS } from '../actions';

export const initialState = {
  uniqueId: null,
  driversById: {},
  closestDriverByType: {},
  transportTypeIds: []
};

export default function closestDrivers(state = initialState, action) {
  if (action.type === CLOSEST_DRIVERS_SUCCESS) {
    const { drivers: driversById, uniqueId } = action;

    const closestDriverByType = reduce(action.drivers, (m, d) => {
      const previousDriver = m[d.transportTypeCode];
      if (previousDriver == null || d.time < previousDriver.time) {
        m[d.transportTypeCode] = d;
      }

      return m;
    }, {});

    const transportTypeIds = map(closestDriverByType, (v, k) => TRANSPORT_TYPES[k] );

    return {
      uniqueId,
      driversById,
      closestDriverByType,
      transportTypeIds
    };
  }

  return state;
}
