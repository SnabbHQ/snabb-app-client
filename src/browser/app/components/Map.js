/* @flow */
import React, {PropTypes} from 'react';
import GoogleMap from 'google-map-react';
import Box from './Box';
import Image from './Image';

// $FlowFixMe
const pickUpMarker = require('../../../common/app/images/pickUpMarker.svg');
const dropOffMarker = require('../../../common/app/images/dropOffMarker.svg');

class Map extends React.Component {

  state = {
    center: [59.3293, 18.0686],
    zoom: 14
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

    const {pickUpPlace, dropOffPlace} = this.props;

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

        { pickUpPlace && pickUpPlace.coordinate &&
        <Box
          position="relative"
          top={-40}
          left={-30}
          lat={pickUpPlace.coordinate.latitude}
          lng={pickUpPlace.coordinate.longitude}
        >
          <Image
            alt="Pick Up Place"
            height={60}
            width={60}
            src={pickUpMarker}
          />
        </Box>
        }

        { dropOffPlace && dropOffPlace.coordinate &&
        <Box
          position="relative"
          top={-40}
          left={-30}
          lat={dropOffPlace.coordinate.latitude}
          lng={dropOffPlace.coordinate.longitude}
        >
          <Image
            alt="Drop Off place"
            height={60}
            width={60}
            src={dropOffMarker}
          />
        </Box>
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
