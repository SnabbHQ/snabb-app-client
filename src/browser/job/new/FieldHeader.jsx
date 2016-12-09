/* @flow */
import React, {PropTypes} from 'react'
import {Grid, View, Image, Heading} from '../../app/components'

const FieldHeader = ({icon, title}) => {

  return (
  <View>
    <Grid>
      <Image
        alt={title}
        mt={2}
        src={icon}
      />
    </Grid>
    <Grid pt={2} ml={2}>
      <Heading
        level={2}
        size={3}>
        {title}
      </Heading>
    </Grid>
  </View>
  )
}

FieldHeader.propTypes = {
  icon: PropTypes.string.isRequired,
  title: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.string,
  ]).isRequired,
}

export default FieldHeader
