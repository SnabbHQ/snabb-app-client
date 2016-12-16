import React from "react"
import {Button, Link} from '../../app/components'
import {FormattedMessage} from "react-intl"
import jobMessages from '../../../common/job/jobMessages'

export default function NewDeliveryButton() {
  return (
    <Button backgroundColor="info">
      <Link
        color="white"
        to={"/new"}
      >
        <FormattedMessage {...jobMessages.newDelivery} />
      </Link>
    </Button>
  )
}
