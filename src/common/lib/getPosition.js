import request from 'superagent';

const FREEGEOIP_URL = 'https://freegeoip.net/json/';

function getPositionFromIp() {
  return new Promise((resolve, reject) => {
    request.get(FREEGEOIP_URL).end((error, response) => {
      if (error) { return reject(error); }

      const { longitude, latitude } = response.body;

      resolve({
        longitude,
        latitude,
      });
    });
  });
}

const n = global.navigator;
const hasGeolocation = n && n.geolocation && n.geolocation.getCurrentPosition;

const GEOLOCATION_OPTIONS = {
  maximumAge: 20 * 60 * 1000,
};

export default function getPosition() {
  if (!hasGeolocation) { return getPositionFromIp(); }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((r) => {
      const { longitude, latitude } = r.coords;

      resolve({
        longitude,
        latitude,
      });
    }, () => resolve(getPositionFromIp()), GEOLOCATION_OPTIONS);
  });
}


// WEBPACK FOOTER //
// ./src/lib/getPosition.js
