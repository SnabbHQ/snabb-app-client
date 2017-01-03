/* @flow */
import type { Styled } from '../themes/types';
import Box, { BoxProps } from './Box';
import styled from './styled';

const Divider: Styled<BoxProps> = styled((theme, props: BoxProps) => ({
  $extends: Box,
  border: 0,
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: theme.divider.borderColor,
  marginTop: props.marginTop || '1em',
  marginBottom: props.marginBottom || '1em',
  width: props.width ? props.width : '100%',
}), 'hr');

export default Divider;
