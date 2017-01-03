/* @flow */
import type { Exact, Styled } from '../themes/types';
import styled from './styled';

type SpaceProps = {
  x: number,
  auto?: boolean,
};

const Space: Styled<ButtonProps> = styled((theme, props) => ({
  display: 'inline-block',
  flex: props.auto ? '1 1 auto' : '',
  width: theme.typography.rhythm(props.x),
}));

Space.defaultProps = ({
  x: 1,
}: Exact<SpaceProps>);

export default Space;
