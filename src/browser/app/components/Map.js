/* @flow */
import React, {PropTypes} from 'react';
import GoogleMap from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';
import Box from './Box';
import Image from './Image';

// $FlowFixMe
const pickupMarker = require('../../../common/app/images/pickupMarker.svg');
const dropoffMarker = require('../../../common/app/images/dropoffMarker.svg');

class Map extends React.Component {

  state = {
    center: [59.3293, 18.0686],
    zoom: 14
  };

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps({pickupPlace, dropoffPlace}) {
    if (pickupPlace || dropoffPlace) {
      // const bounds = {
      //   nw: {
      //     lat: pickupPlace.coordinate.latitude,
      //     lng: pickupPlace.coordinate.longitude
      //   },
      //   se: {
      //     lat: pickupPlace.coordinate.latitude,
      //     lng: pickupPlace.coordinate.longitude
      //   }
      // };
      //
      // const size = {
      //   width: 640, // Map width in pixels
      //   height: 380, // Map height in pixels
      // };
      //
      // const { center } = fitBounds(bounds, size);
      // this.setState({center: center});
    }
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
    const {pickupPlace, dropoffPlace} = this.props;

    const bounds = {
      pickupPlace,
      dropoffPlace
    };

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
      >

        { pickupPlace && pickupPlace.coordinate &&
        <Box
          position="relative"
          top={-40}
          left={-30}
          lat={pickupPlace.coordinate.latitude}
          lng={pickupPlace.coordinate.longitude}
        >
          <Image
            alt="Pick Up Place"
            height={60}
            width={60}
            src={pickupMarker}
          />
        </Box>
        }

        { dropoffPlace && dropoffPlace.coordinate &&
        <Box
          position="relative"
          top={-40}
          left={-30}
          lat={dropoffPlace.coordinate.latitude}
          lng={dropoffPlace.coordinate.longitude}
        >
          <Image
            alt="Drop Off place"
            height={60}
            width={60}
            src={dropoffMarker}
          />
        </Box>
        }

      </GoogleMap>
    )
  }
}

// MapProps. = {
//   pickupPlace: ?Object,
//   dropoffPlace: ?Object,
// }

export default Map;
