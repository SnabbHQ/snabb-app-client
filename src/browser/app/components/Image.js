/* @flow */
/* eslint-disable jsx-a11y/img-has-alt */
import React from 'react';
import styled from './styled';

type ImageProps = {|
  alt?: string,
  height: number,
  src: string | number, // number, because src={require('./foo.png')}
  width: number,
|};

const altOrRolePresentation = alt => alt
  ? { alt }
  : { role: 'presentation' };

// TODO: Use more sophisticated logic based on aspect ratio etc.
const ImageWrapper = styled((theme, props) => ({
  display: 'block',
  // width: ,
  // height: `${
  //   Math.floor(props.height / theme.typography.lineHeight) *
  //   theme.typography.lineHeight
  // }px`,
  height: props.height,
}));

const Image = (props: ImageProps) => (
  <ImageWrapper
    height={props.height}
    // width={props.width}
  >
    <img
      {...altOrRolePresentation(props.alt)}
      height="100%"
      src={props.src}
      width="100%"
    />
  </ImageWrapper>
);

export default Image;
