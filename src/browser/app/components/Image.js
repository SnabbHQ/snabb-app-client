/* @flow */
/* eslint-disable jsx-a11y/img-has-alt */
import React from 'react';
import styled from './styled';

type ImageProps = {|
  alt?: string,
  height: number,
  src: string | number, // number, because src={require('./foo.png')}
  width?: number,
  onClick?: (e: SyntheticMouseEvent) => any,
|};

const altOrRolePresentation = alt => alt
  ? { alt }
  : { role: 'presentation' };

const ImageWrapper = styled((theme, props) => ({
  display: 'block',
  height: props.height,
}), 'div', ['onClick']);

const Image = (props: ImageProps) => (
  <ImageWrapper
    height={props.height}
    onClick={props.onClick}
  >
    <img
      {...altOrRolePresentation(props.alt)}
      height="100%"
      src={props.src}
      width={props.width ? props.width : '100%'}
    />
  </ImageWrapper>
);

export default Image;
