import React, { PropTypes } from 'react'
import wrapFields, { wrappedFieldsPropTypes } from '../../lib/wrapFields'
import {Block, Flex, Grid, View, Image, Space, Separator, Heading} from '../../app/components'
import PlaceFields from './PlaceFields'
import pickupIcon from "../../../../assets/images/pickupBadgeBlank.svg"
import dropIcon from "../../../../assets/images/dropOffBadgeBlank.svg"


const JobFields = ({}) => {

  return (
    <View>
      <View>
        <Grid>
          <Image
            alt="Pickup Icon"
            mt={2}
            src={pickupIcon}
          />
        </Grid>
        <Grid pt={2} ml={2}>
          <Heading
            level={2}
            size={3}>
            Pick up
          </Heading>
        </Grid>
      </View>
      <PlaceFields placeType="pickUp"/>
      <Space x={1}/>
      <Separator/>
      <Space x={1}/>
      <View>
        <Grid>
          <Image
            alt="Pickup Icon"
            mt={2}
            src={dropIcon}
          />
        </Grid>
        <Grid pt={2} ml={2}>
          <Heading
            level={2}
            size={3}>
            Drop Off
          </Heading>
        </Grid>
      </View>
      <PlaceFields placeType="dropOff"/>
    </View>
  )
}

export default JobFields
