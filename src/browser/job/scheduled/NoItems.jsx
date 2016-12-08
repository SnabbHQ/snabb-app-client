import React from "react"
import {Blankslate} from "../../app/components"
import jobMessages from '../../../common/job/jobMessages'
import activeBlankslateIcon from "../../../../assets/images/activeBlankslateIcon.svg"
import {RequestNewDeliveryButton} from '../components'

function NoItems() {
  return (
    <Blankslate
      icon={activeBlankslateIcon}
      title={jobMessages.noScheduledJobsTitle}
      subtitle={jobMessages.noScheduledJobsSubTitle}
      actions={
        <RequestNewDeliveryButton/>
      }
    />
  )
}

export default NoItems
