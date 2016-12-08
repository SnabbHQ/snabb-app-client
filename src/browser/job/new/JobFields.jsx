import React, { PropTypes } from 'react'
import wrapFields, { wrappedFieldsPropTypes } from '../../lib/wrapFields'
import {Block, View, Heading, Grid, Input} from '../../app/components'
import PlaceFields from './PlaceFields'

const JobFields = ({}) => {



  return (
    <Block>
      <Heading
        level={2}
        size={3}>
        PICKUP
      </Heading>

      <PlaceFields/>

    </Block>
  )
}

export default JobFields
