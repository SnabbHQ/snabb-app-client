/* @flow */
import type { Styled, InputTypes } from '../themes/types';
import React from 'react';
import styled from './styled';
import Text, { TextProps } from './Text';
import Box from './Box';

export type InputProps = TextProps & {
  name?: string,
  label?: string,
  labelSize?: string,
  placeholder?: string,
  maxLength?: number,
  type?: InputTypes,
  invalid?: boolean
}

const CustomInput = styled((theme, props: InputProps) => ({
  $extends: Text,
  display: 'block',
  width: '100%',
  color: props.color ? theme.colors[props.color] : theme.colors.black,
  border: theme.input.borderColor,
  borderColor: props.invalid ? theme.colors.error : theme.input.borderColor,
  transition: 'border 0.3s',
  type: props.type ? props.type : 'text',
}), 'input', ['name', 'placeholder', 'type', 'onKeyDown']);

const Input: Styled<InputProps> = (props: InputProps) => (
  <Box marginBottom={'0.5em'}>
    {props.label ? <Text size={props.labelSize ? props.labelSize : 0}>{props.label}</Text> : null}
    <CustomInput {...props} />
  </Box>
);

export default Input;
