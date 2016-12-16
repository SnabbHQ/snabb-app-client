/* @flow */
import type { Styled } from '../themes/types';
import type { BoxProps } from './Box';
import Box from './Box';
import styled from './styled';

const Panel: Styled<BoxProps> = styled((theme, props) => ({
  $extends: Box,
  width: '60%',
  '@media (max-width: 768px)': {
    width: '100%'
  }
}))

export default Panel;
