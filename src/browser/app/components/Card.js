/* @flow */
import type { Styled } from '../themes/types';
import styled from './styled';
import Box, { BoxProps } from './Box';

type CardProps = BoxProps & {|
  |};

const Card: Styled<CardProps> = styled((theme, {
  backgroundColor = 'white',
}) => ({
  $extends: Box,
  display: 'block',
  border: true,
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: theme.border.radius,
  borderColor: theme.divider.borderColor,
  padding: '1em',
  backgroundColor: backgroundColor,
}));

export default Card;
