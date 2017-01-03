/* @flow */
import type { Styled } from '../themes/types';
import styled from './styled';
import { BoxProps } from './Box';

const Block: Styled<BoxProps> = styled(() => ({
  display: 'block',
}));

export default Block;
