/* @flow */
import type { Styled } from '../themes/types';
import styled from './styled';

type SpaceProps = {
  x: number,
  auto?: boolean,
};

const Space: Styled<SpaceProps> = styled((theme, {
  x = 1,
  auto,
}) => ({
  display: 'inline-block',
  flex: auto ? '1 1 auto' : '',
  width: theme.typography.rhythm(x),
}), 'div');

export default Space;
