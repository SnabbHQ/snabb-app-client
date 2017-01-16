/* @flow */
import type { Styled } from '../themes/types';
import type { BoxProps } from './Box';
import Box from './Box';
import React from 'react';

const CenteredBox: Styled<BoxProps> = ({
  display = 'flex',
  justifyContent = 'center',
  ...props
}) => (
  <Box
    display={display}
    justifyContent={justifyContent}
    {...props}
  />
);

export default CenteredBox;
