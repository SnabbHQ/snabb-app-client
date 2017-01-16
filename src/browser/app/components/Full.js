/* @flow */
import type { Styled } from '../themes/types';
import styled from './styled';

type FullProps = {|
  top?: boolean,
  right?: boolean,
  bottom?: boolean,
  left?: boolean,
  zIndex?: number
  |};

const Full: Styled<FullProps> = styled({
  display: 'flex',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
}, 'div');

export default Full;
