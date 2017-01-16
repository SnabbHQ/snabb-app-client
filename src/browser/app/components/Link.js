/* @flow */
import type { Styled } from '../themes/types';
import type { TextProps } from './Text';
import React from 'react';
import Text from './Text';
import styled from './styled';
import { Link as ReactRouterLink } from 'react-router';

type LinkProps = TextProps & {
  download?: boolean,
  exactly?: boolean,
  target?: string,
  to: string,
  onClick?: (e: SyntheticMouseEvent) => any,
};

const createLink = (tag, passProps) => styled((theme, props: LinkProps) => ({
  $extends: Text,
  color: props.color ? theme.colors[props.color] : theme.colors.accent,
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'none',
    color: 'grey',
  },
}), tag, passProps);

const AnchorLink = createLink('a', [
  'download', 'href', 'target', 'onClick',
]);

const RouterLink = createLink(ReactRouterLink, [
  'activeOnlyWhenExact', 'activeStyle', 'to', 'onClick',
]);

const isExternalLink = to => to.includes('://');
const routerLinkActiveStyle = { color: 'grey', textDecoration: 'none' };

const Link: Styled<LinkProps> = (props: LinkProps) => (
  isExternalLink(props.to) ?
    <AnchorLink
      {...props}
      href={props.to}
      target="_blank"
    />
    :
    <RouterLink
      {...props}
      activeOnlyWhenExact={props.exactly}
      activeStyle={routerLinkActiveStyle}
    />
);

export default Link;
