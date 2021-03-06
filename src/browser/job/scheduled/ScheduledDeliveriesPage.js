/* @flow */
import type { State } from '../../../common/types'
import R from 'ramda'
import React from "react"
import {connect} from "react-redux"
import {Block} from "../../app/components"
import NoItems from "./NoItems"

const ScheduledJobsPage = ({ jobs }) => {
  if (R.isEmpty(jobs)) {
    return (
      <NoItems/>
    )
  }

  return (
    <Box/>
  )
}

ScheduledJobsPage.propTypes = {
  jobs: React.PropTypes.object.isRequired
};

export default connect(
  (state: State) => ({
    jobs: {}//state.jobs.all,
  }),
  {},
)(ScheduledJobsPage);
