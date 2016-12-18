/* @flow */
import type { Styled } from '../themes/types';
import styled from './styled';

type ContainerProps = {
  maxWidth?: string | number
};

const Container: Styled<ContainerProps> = styled((theme, props) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: 'auto',
  maxWidth: props.maxWidth ? props.maxWidth : theme.container.maxWidths.full,
  minHeight: '100vh', // make footer sticky
  // paddingLeft: theme.typography.rhythm(1),
  // paddingRight: theme.typography.rhythm(1),
}));

export default Container;
