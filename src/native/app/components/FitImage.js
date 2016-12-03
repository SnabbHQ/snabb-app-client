import React from 'react';
import { Image, Dimensions } from 'react-native';

export default class FitImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = this._getSize(props);
  }
  _getSize(props) {
    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Dimensions.get('window').height;
    const ratio = Math.min(deviceWidth / props.originalWidth, deviceHeight / props.originalHeight);

    const width = ratio * props.originalWidth;
    const height = ratio * props.originalHeight;
    return {width, height};
  }

  resize() {
    this.setState(this._getSize(this.props));
  }

  render() {
    const {width, height} = this.state;
    return (
      <Image
        style={{flex: 1, width, height}}
        source={this.props.source}
        onLayout={(event) => this.resize(event)}
      />
    );
  }
}
