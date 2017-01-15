/* @flow */
import type { Styled } from '../themes/types';
import type { TextProps } from './Text';
import Box from './Box';
import React from 'react';
import styled from './styled';
import Text from './Text';

// Only HTML5 text inputs. Checkbox and radio must be SVG to size scale.
type InputTypes =
  'color'
    | 'date'
    | 'datetime'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'month'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
  ;

export type InputProps = TextProps & {
  error?: string,
  inline?: boolean,
  invalid?: boolean,
  label?: string,
  labelSize?: string,
  maxLength?: number,
  onChange?: (SyntheticEvent) => void,
  name?: string,
  placeholder?: string,
  type?: InputTypes,
  value?: string,
}

// This is gold. Input looks like exactly as Text in all modern browsers.
// That's great for in place editing UI with vertical rhythm everywhere.
const enforceTextLook = {
  map: style => ({
    ...style,
    // This fixes a lot of issues and it's ok. Input can't be multiline.
    height: style.lineHeight,
  }),
  // All these values are required. Otherwise, Edge or Firefox would break.
  style: {
    borderWidth: 0,
    display: 'block',
    margin: 0,
    outline: 'none', // Input doesn't need the outline, focus state is obvious.
    padding: 20,
    width: '100%',
  },
};

const StyledInput: Styled<InputProps> = styled((theme, props: InputProps) => ({
  $extends: Text,
  $map: enforceTextLook.map,
  ...enforceTextLook.style,
  border: props.error ? `solid 1px ${theme.colors.danger}` : 'solid 1px #f6f6f6',
  ':focus': {
    border: props.error ? `solid 1px ${theme.colors.danger}` : `solid 1px ${theme.colors.accent}`,
  },
  borderRadius: theme.border.radius,
  backgroundColor: '#f6f6f6',
  color: props.color ? theme.colors[props.color] : theme.colors.black,
  transition: 'border 0.1s',
  width: '100%',
}), 'input', [
  'name',
  'onChange',
  'placeholder',
  'type',
  'value',
  'onKeyDown',
  'maxLength',
]);

const checkIfOwnError = (error, name) => error && error.params && error.params.prop === name;

const Input: Styled<InputProps> = ({
  error,
  name,
  placeholder,
  size = 0,
  ...props
}) => (
  <Box marginBottom={'0.5em'}>
    <StyledInput
      error={checkIfOwnError(error, name) && error}
      placeholder={placeholder}
      size={size}
      {...props}
    />
  </Box>
);

export default Input;
