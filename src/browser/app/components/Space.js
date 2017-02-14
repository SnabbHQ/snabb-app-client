/* @flow */
import type { Styled } from '../themes/types';
import styled from './styled';

type SpaceProps = {
  x?: number,
  auto?: boolean,
};

const Space: Styled<SpaceProps> = styled((theme, {
  x = 0.33,
  y = 0,
  auto,
}) => ({
  display: 'inline-block',
  flex: auto ? '1 1 auto' : '',
  width: theme.typography.rhythm(x),
  height: theme.typography.rhythm(y),
}), 'div');

export default Space;
