/* @flow */
import type { State } from '../../../common/types';
import R from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import { Box } from '../../app/components';
import NoHistoryPlaceholder from './NoHistoryPlaceholder';

const HistoryPage = ({ jobs }) => {
  if (R.isEmpty(jobs)) {
    return (
      <NoHistoryPlaceholder />
    );
  }

  return (
    <Box />
  );
};

HistoryPage.propTypes = {
  jobs: React.PropTypes.object.isRequired,
};

export default connect(
  (state: State) => ({
    jobs: {}, // state.jobs.all,
  }),
  {},
)(HistoryPage);
