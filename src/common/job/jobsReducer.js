import reduce from 'lodash/reduce';
import { isActive, isScheduled } from '../lib/jobHelpers';

function getFilter(job) {
  // When job expires, we want to keep it in the active page to allow the
  // client to retry it.
  const isExpired = job.status === 'expired';

  if (isExpired || isActive(job)) {
    return 'active';
  }

  if (isScheduled(job)) {
    return 'scheduled';
  }

  return 'history';
}

export const initialState = {
  jobsById: {},
  jobIdsByFilter: {
    active: [],
    history: [],
    scheduled: []
  }
};

export default function jobs(state = initialState, action) {
  const { jobs } = action;

  if (jobs) {
    const jobsById = {
      ...state.jobsById,
      ...jobs
    };

    const jobIdsByFilter = reduce(jobsById, (m, j) => {
      if (!j) { return m; }

      m[getFilter(j)].push(j.id);

      return m;
    }, {
      active: [],
      history: [],
      scheduled: []
    });

    jobIdsByFilter.active.sort((a, b) => b - a);
    jobIdsByFilter.history.sort((a, b) => b - a);
    jobIdsByFilter.scheduled.sort((a, b) => b - a);

    return {
      jobsById,
      jobIdsByFilter
    };
  }

  return state;
}
