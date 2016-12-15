/* @flow */
import R from "ramda"
import React from "react"
import {connect} from "react-redux"
import {View} from "../../app/components"
import NoItems from "./NoItems"

const ActiveJobsPage = ({ jobs }) => {
  if (R.isEmpty(jobs)) {
    return (
      <NoItems/>
    )
  }

  return (
    <View/>
  )
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
