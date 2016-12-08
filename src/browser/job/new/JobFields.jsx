import React, { PropTypes } from 'react'
import wrapFields, { wrappedFieldsPropTypes } from '../../lib/wrapFields'
import {Block, View, Heading, Grid, Input} from '../../app/components'

const JobFields = ({}) => {

  const onInputKeyDown = (event) => {
  }

  return (
    <Block>
      <Heading
        level={2}
        size={3}>
        PICKUP
      </Heading>

      <View>
        <Grid col={6} pt={2}>
          <Input
            label="First Name"
            maxLength={100}
            onKeyDown={onInputKeyDown}
            placeholder={'Hola'}
          />
        </Grid>
        <Grid col={6} pt={2} pl={2}>
          <Input
            label="Last Name"
            maxLength={100}
            onKeyDown={onInputKeyDown}
            placeholder={'Hola'}
          />
        </Grid>
      </View>

      <Input
        label="Business Name"
        maxLength={100}
        onKeyDown={onInputKeyDown}
        placeholder={'Business Name'}
      />

      <Input
        label="Address*"
        maxLength={100}
        onKeyDown={onInputKeyDown}
        placeholder={'Address'}
      />

      <View>
        <Grid col={6} >
          <Input
            label="Email"
            maxLength={100}
            onKeyDown={onInputKeyDown}
            placeholder={'Hola'}
          />
        </Grid>
        <Grid col={6} pl={2}>
          <Input
            label="Phone Number"
            maxLength={100}
            onKeyDown={onInputKeyDown}
            placeholder={'Hola'}
          />
        </Grid>
      </View>

      <Input
        label="Comments for the courier"
        maxLength={100}
        onKeyDown={onInputKeyDown}
        placeholder={'Hola'}
      />

    </Block>
  )
}

export default JobFields
