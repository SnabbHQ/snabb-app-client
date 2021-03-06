/* @flow */
import type { State } from '../../../common/types';
import R from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import { Box } from '../../app/components';
import NoActiveJobsPlaceholder from './NoActiveJobsPlaceholder';

const ActiveJobsPage = ({ jobs }) => {
  if (R.isEmpty(jobs)) {
    return (
      <NoActiveJobsPlaceholder />
    );
  }

  return (
    <Box />
  );
};

ActiveJobsPage.propTypes = {
  jobs: React.PropTypes.object.isRequired,
};

export default connect(
  (state: State) => ({
    jobs: {}, // state.jobs.all,
  }),
  {},
)(ActiveJobsPage);
