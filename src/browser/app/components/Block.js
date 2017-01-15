/* @flow */
import type { Styled } from '../themes/types';
import type { BoxProps } from './Box';
import styled from './styled';

const Block: Styled<BoxProps> = styled(() => ({
  display: 'block',
}));

export default Block;
