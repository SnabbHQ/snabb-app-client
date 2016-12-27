/* @flow */
import type { Styled } from '../themes/types';
import styled from './styled';
import Box, { BoxProps } from './Box';

type FixedProps = BoxProps & {|
  top?: boolean,
  right?: boolean,
  bottom?: boolean,
  left?: boolean,
  zIndex?: number
  |};

const Fixed: Styled<FixedProps> = styled((theme, props) => ({
  $extends: Box,
  position: 'fixed',
  top: props.top ? '0px' : null,
  right: props.right ? '0px' : null,
  bottom: props.bottom ? '0px' : null,
  left: props.left ? '0px' : null,
  zIndex: props.zIndex ? `${props.zIndex}` : 0,
}));

export default Fixed;
