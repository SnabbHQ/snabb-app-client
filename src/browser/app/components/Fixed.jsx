/* @flow */
import type { Styled } from '../themes/types';
import styled from './styled';

type FixedProps = {|
  top?: boolean,
  right?: boolean,
  bottom?: boolean,
  left?: boolean,
  zIndex?: number
|};

const Fixed = styled((theme, props) => ({
  position: 'fixed',
  top: props.top ? '0px' : '',
  right: props.right ? '0px' : '',
  bottom: props.bottom ? '0px' : '',
  left: props.left ? '0px' : '',
  zIndex: props.zIndex ? props.zIndex + 'px' : 0,
}))

export default Fixed
