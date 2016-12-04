import each from 'lodash/each';
import { CITIES } from './constants';

export default function getClosestCity(position) {
  let closestCity;
  let closestDistance;

  each(CITIES, (city, cityId) => {
    const d = google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(position.latitude, position.longitude),
      new google.maps.LatLng(city.center.latitude, city.center.longitude)
    );

    if (closestDistance == null || closestDistance > d) {
      closestCity = cityId;
      closestDistance = d;
    }
  });

  return closestCity;
}
