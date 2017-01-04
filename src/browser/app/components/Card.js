/* @flow */
import type { Styled } from '../themes/types';
import styled from './styled';
import Box, { BoxProps } from './Box';

type CardProps = BoxProps & {|
  |};

const Card: Styled<CardProps> = styled((theme, props) => ({
  $extends: Box,
  display: 'block',
  border: true,
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: theme.divider.borderColor,
  padding: '2em',
  backgroundColor: 'white',
}));

export default Card;