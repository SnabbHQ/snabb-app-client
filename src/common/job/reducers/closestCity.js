import { CLOSEST_CITY_SUCCESS } from '../actions';

export default function closestCity(state = null, action) {
  if (action.type === CLOSEST_CITY_SUCCESS) {
    return action.city;
  }

  return state;
};
