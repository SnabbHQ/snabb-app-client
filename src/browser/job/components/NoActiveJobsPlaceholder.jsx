import React from "react"
import {Blankslate} from "../../app/components"
import jobMessages from '../../../common/job/jobMessages'
import activeBlankslateIcon from "../../../../assets/images/activeBlankslateIcon.svg"
import {RequestNewDeliveryButton} from './'

function NoActiveJobsPlaceholder() {
  return (
    <Blankslate
      icon={activeBlankslateIcon}
      title={jobMessages.noActiveJobsTitle}
      subtitle={jobMessages.noActiveJobsSubtitle}
      actions={
        <RequestNewDeliveryButton/>
      }
    />
  )
}

export default NoActiveJobsPlaceholder
