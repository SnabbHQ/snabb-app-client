/* @flow */
import React from "react"
import GoogleMap from 'google-map-react';

const Map = () => {
  const defaultProps = {
    center: {lat: 59.938043, lng: 30.337157},
    zoom: 9,
    greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
  }

  return (
    <GoogleMap
      bootstrapURLKeys={{key: 'AIzaSyAap17mxLF2XLZdnisFJeJd9bniprOKXCs'}}
      defaultCenter={defaultProps.center}
      defaultZoom={defaultProps.zoom}/>
  )
}

export default Map;
