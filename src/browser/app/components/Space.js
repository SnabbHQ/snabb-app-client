/* @flow */
import type { Exact, Styled } from '../themes/types';
import { scale } from '../themes/typography';
import styled from './styled';

type SpaceProps = {
  x?: number | $Keys<typeof scale>,
  auto?: boolean,
};

const Space: Styled<ButtonProps> = styled((theme, props) => ({
  display: 'inline-block',
  flex: props.auto ? '1 1 auto' : null,
  width: props.x ? scale[0] : scale[props.x],
}));

Space.defaultProps = ({
  x: 1,
}: Exact<SpaceProps>);

export default Space;
