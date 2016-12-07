/* @flow */
import R from 'ramda'
import React from "react"
import {connect} from "react-redux"
import {Block, BlankSlate } from "../app/components"
import { NoActiveJobsPlaceholder } from "./components"

const ActiveJobsPage = ({ jobs }) => {
  if (R.isEmpty(jobs)) {
    return (
      <NoActiveJobsPlaceholder/>
    )
  }
}

ActiveJobsPage.propTypes = {
  jobs: React.PropTypes.object.isRequired
};

export default connect(
  (state: State) => ({
    jobs: {}//state.jobs.all,
  }),
  {},
)(ActiveJobsPage);
