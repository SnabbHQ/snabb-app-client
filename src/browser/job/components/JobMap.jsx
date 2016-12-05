import React, { PropTypes } from 'react';
import { isPending } from '../../lib/jobHelpers';
import { isPicking } from '../../lib/deliveryHelpers';
import MarkersMap from '../MarkersMap';

const JobMap = React.createClass({
  propTypes: {
    drivers: MarkersMap.propTypes.drivers,
    job: PropTypes.object,
    offsetX: PropTypes.number
  },

  render() {
    const { job, offsetX } = this.props;

    if (job == null) {
      return <MarkersMap />;
    }

    const { status, currentDelivery, originPlace, destinationPlace } = job;

    if (isPending(job)) {
      return (
        <MarkersMap
          offsetX={offsetX}
          drivers={this.props.drivers}
          places={[originPlace, destinationPlace]} />
      );
    }

    if (status === 'finished' || currentDelivery == null) {
      return (
        <MarkersMap
          offsetX={offsetX}
          places={[originPlace, destinationPlace]} />
      );
    }

    const place = isPicking(currentDelivery) ? originPlace : destinationPlace;
    const { driver } = currentDelivery;
    return (
      <MarkersMap
        offsetX={offsetX}
        places={[place]}
        drivers={[driver]} />
    );
  }
});

export default JobMap;
