import React from "react"
import {Button, Link} from '../../app/components'
import {FormattedMessage} from "react-intl"
import jobMessages from '../../../common/job/jobMessages'

export default function NewDeliveryButton() {

  const greet = () => {
    alert('Hello World')
  }

  return (
    <Button backgroundColor="info" onClick={greet}>
      <FormattedMessage {...jobMessages.newDelivery} />
    </Button>
  )
}
