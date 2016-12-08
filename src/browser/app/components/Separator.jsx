/* @flow */
import React from 'react'
import View from './View'

const Separator = ({...props}, { rebass }) => {
  const separatorProps = {
    ...props,
  }

  return (
    <View
      {...separatorProps}
      style={rebass.separator}
    />
  )
}

Separator.contextTypes = {
  rebass: React.PropTypes.object,
}

export default Separator
