import React, { PropTypes } from 'react';
import each from 'lodash/each';
import map from 'lodash/map';
import reduce from 'lodash/reduce';

const MARKERS = {
  bike: require('../../../assets/images/bikeMarker.svg'),
  cargobike: require('../../../assets/images/cargobikeMarker.svg'),
  car: require('../../../assets/images/carMarker.svg'),
  motorbike: require('../../../assets/images/motorbikeMarker.svg'),
  cargobikexl: require('../../../assets/images/cargobikeXLMarker.svg'),
  van: require('../../../assets/images/vanMarker.svg'),
  walk: require('../../../assets/images/walkMarker.svg'),
  dropOff: require('../../../assets/images/dropOffMarker.svg'),
  pickUp: require('../../../assets/images/pickUpMarker.svg')
};

const hasGoogle = typeof google !== 'undefined';

const collectionType = React.PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.object),
  PropTypes.objectOf(PropTypes.object)
]);

const MarkersMap = React.createClass({
  propTypes: {
    center: PropTypes.object,
    offsetX: PropTypes.number,
    offsetY: PropTypes.number,
    zoom: PropTypes.number,
    places: collectionType,
    drivers: collectionType,
    fitToPlaces: PropTypes.bool,
    fitToDrivers: PropTypes.bool
  },

  getDefaultProps() {
    return {
      zoom: 16,
      places: [],
      drivers: [],
      fitToPlaces: true,
      fitToDrivers: true,
      offsetX: 0,
      offsetY: 0
    };
  },

  componentDidMount() {
    if (!hasGoogle) { return; }

    const options = {
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      zoomControl: true,
      scrollwheel: false,
      center: this.props.center,
      zoom: this.props.zoom,
      maxZoom: this.props.zoom
    };

    if (this.props.center) {
      const {
        latitude: lat,
        longitude: lng
      } = this.props.center;
      options.center = { lat, lng };
    }
    this._map = new google.maps.Map(this.refs.map, options);

    this._markersCache = {};
    this.setMarkers();
    this.setOffsetCenter();
  },

  componentDidUpdate() {
    if (!hasGoogle) { return; }

    this.setMarkers();
    this.setOffsetCenter();
  },

  setOffsetCenter() {
    this._map.panBy(this.props.offsetX, this.props.offsetY);
  },

  setMarker(cacheKey, options, object) {
    let marker = this._markersCache[cacheKey];

    if (marker) {
      // Do not update marker if object has not changed.
      if (marker._object === object) { return marker; }

      marker.setPosition(options.position);
    } else {
      marker = new google.maps.Marker(options);
      marker._cacheKey = cacheKey;
    }

    marker._object = object;

    return marker;
  },

  setPlaceMarker(place) {
    const {
      address: { latitude, longitude },
      placeType: { code }
    } = place;

    return this.setMarker(`place-${place.id}`, {
      animation: google.maps.Animation.DROP,
      map: this._map,
      icon: code === 'picking' ? MARKERS.pickUp : MARKERS.dropOff,
      position: { lat: parseFloat(latitude), lng: parseFloat(longitude) }
    }, place);
  },

  setDriverMarker(driver) {
    let position;
    if (driver.currentDriverDevice) {
      const l = driver.currentDriverDevice.lastDriverDeviceLocation;
      position = {
        lat: parseFloat(l.latitude),
        lng: parseFloat(l.longitude)
      };
    } else {
      position = {
        lat: parseFloat(driver.latitude),
        lng: parseFloat(driver.longitude)
      };
    }

    let code;
    if (driver.currentDriverWorkMode) {
      code = driver.currentDriverWorkMode.transportType.code;
    } else {
      code = driver.transportTypeCode;
    }

    return this.setMarker(`driver-${driver.id}`, {
      map: this._map,
      icon: MARKERS[code],
      position
    }, driver);
  },

  setMarkers() {
    const placesMarkers = map(this.props.places, this.setPlaceMarker);
    const driversMarkers = map(this.props.drivers, this.setDriverMarker);
    const markers = placesMarkers.concat(driversMarkers);

    const nextMarkersCache = reduce(markers, (m, marker) => {
      m[marker._cacheKey] = marker;
      return m;
    }, {});

    // Remove markers that are not used anymore from the map by checking if
    // markers are in the next cache.
    each(this._markersCache, (m) => {
      if (!nextMarkersCache[m._cacheKey]) { m.setMap(null); }
    });

    // Discard old markers cache.
    this._markersCache = nextMarkersCache;

    // Fit map zoom and position to markers.
    const { fitToPlaces, fitToDrivers } = this.props;
    let boundsMarkers = markers;
    if (!fitToPlaces && !fitToDrivers) {
      boundsMarkers = [];
    } else if (!fitToPlaces) {
      boundsMarkers = driversMarkers;
    } else if (!fitToDrivers) {
      boundsMarkers = placesMarkers;
    }
    if (boundsMarkers.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      boundsMarkers.forEach((m) => bounds.extend(m.getPosition()));
      this._map.fitBounds(bounds);
    }
  },

  render() {
    return <div ref='map' style={{ height: '100%' }} />;
  }
});

export default MarkersMap;
