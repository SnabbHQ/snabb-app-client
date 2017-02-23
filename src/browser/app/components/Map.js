/* @flow */
import React, { PropTypes } from 'react';
import GoogleMap from 'google-map-react';
import Image from './Image';

// $FlowFixMe
const pickUpMarker = require('../../../common/app/images/pickUpMarker.svg');
const dropOffMarker = require('../../../common/app/images/dropOffMarker.svg');

const K_MARGIN_TOP = 30;
const K_MARGIN_RIGHT = 30;
const K_MARGIN_BOTTOM = 30;
const K_MARGIN_LEFT = 30;


class Map extends React.Component {

  state = {
    center: [59.3293, 18.0686],
    zoom: 15
  };

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.setState({
          center: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          }
        });
      }
    )
  }

  onChange = ({center, zoom}) => {
    this.setState({
      center: center,
      zoom: zoom,
    });
  };

  render() {

    const { pickUpPlace, dropOffPlace } = this.props;

    return (
      <GoogleMap
        bootstrapURLKeys={{
            key: 'AIzaSyCsTTW91wWCBlAaY_Fo6nQcciurX2hRu2k',
            language: 'en',
          }}
        center={this.state.center}
        zoom={this.state.zoom}
        resetBoundsOnResize
        onChange={this.onChange}
        margin={[K_MARGIN_TOP, K_MARGIN_RIGHT, K_MARGIN_BOTTOM, K_MARGIN_LEFT]}
      >

        { pickUpPlace && pickUpPlace.coordinate &&
        <Image
          alt="Pick Up Place"
          height={60}
          width={60}
          lat={pickUpPlace.coordinate.latitude}
          lng={pickUpPlace.coordinate.longitude}
          src={pickUpMarker}
        />
        }

        { dropOffPlace && dropOffPlace.coordinate &&
        <Image
          alt="Drop Off place"
          height={60}
          width={60}
          lat={dropOffPlace.coordinate.latitude}
          lng={dropOffPlace.coordinate.longitude}
          src={dropOffMarker}
        />
        }

      </GoogleMap>
    )
  }
}

// MapProps. = {
//   pickUpPlace: ?Object,
//   dropOffPlace: ?Object,
// }

export default Map;
