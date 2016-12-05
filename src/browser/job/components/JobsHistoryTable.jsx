import React, { PropTypes } from 'react';
import Table from '../../app/components/Table';
import {
  idColumn,
  pickUpColumn,
  dropOffColumn,
  priceColumn,
  driverColumn
} from './jobColumns';

const JobsHistoryTable = React.createClass({
  propTypes: {
    hasMore: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    jobs: PropTypes.array.isRequired,
    onLoadMoreClick: PropTypes.func.isRequired
  },

  render() {
    return (
      <Table
        columns={[
          idColumn,
          pickUpColumn,
          dropOffColumn,
          priceColumn,
          driverColumn
        ]}
        hasMore={this.props.hasMore}
        isLoading={this.props.isLoading}
        onLoadMoreClick={this.props.onLoadMoreClick}
        rows={this.props.jobs} />
    );
  }
});

export default JobsHistoryTable;
