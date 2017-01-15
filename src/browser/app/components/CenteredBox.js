/* @flow */
import type { Styled } from '../themes/types';
import type { BoxProps } from './Box';
import Box from './Box';
import styled from './styled';

type CenteredBoxProps = BoxProps

const CenteredBox: Styled<CenteredBoxProps> = styled(() => ({
  $extends: Box,
  display: 'flex',
  justifyContent: 'center',
}));

export default CenteredBox;
