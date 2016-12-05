/* @flow */
import React from 'react'
import Button from './Button'

type Props = {
  disabled?: boolean,
  style?: any,
};

const PrimaryButton = ({ disabled, style, ...props }: Props, { rebass }: Object) => {
  const sx = {
    ...style,
    ...(disabled && rebass.states.disabled),
  };
  return (
    <Button {...props} disabled={disabled} backgroundColor={'accent'} style={sx} />
  );
};

PrimaryButton.contextTypes = {
  rebass: React.PropTypes.object,
};

export default PrimaryButton;
