/* @flow */
import React, { PropTypes } from 'react';
import GoogleMap from 'google-map-react';

const Map = () => {
  const defaultProps = {
    center: {lat: 39.470128, lng: -0.370621},
    zoom: 16,
    greatPlaceCoords: {lat: 59.724465, lng: 30.080121},
  };

  return (
    <GoogleMap
      bootstrapURLKeys={{
            key: 'AIzaSyCHel-4O415Brc6BGGKhMvg-HYxuEShEWw',
            language: 'en',
          }}
      defaultCenter={defaultProps.center}
      defaultZoom={defaultProps.zoom}
    />
  )
};

export default Map;
