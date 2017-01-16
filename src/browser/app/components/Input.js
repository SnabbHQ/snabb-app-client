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
  disabled?: boolean,
  error?: string,
  field?: Object,
  inline?: boolean,
  invalid?: boolean,
  maxLength?: number,
  onChange?: (SyntheticEvent) => void,
  name?: string,
  placeholder?: string,
  rows?: number,
  type?: InputTypes,
  value?: string,
}

// This is gold. Input looks like exactly as Text in all modern browsers.
// That's great for in place editing UI with vertical rhythm everywhere.
const enforceTextLook = {
  map: rows => style => ({
    ...style,
    height: rows * Number(style.lineHeight),
    padding: 10,
  }),
  // All these values are required. Otherwise, Edge or Firefox would break.
  style: {
    borderWidth: 0,
    display: 'block',
    margin: 0,
    outline: 'none', // Input doesn't need the outline, focus state is obvious.
    padding: 0,
    width: '100%',
  },
};

const create = (tag, passProps = []) => styled((theme, {
  disabled,
  rows,
  error,
  padding,
}) => ({
  $extends: Text,
  $map: enforceTextLook.map(rows),
  ...enforceTextLook.style,
  ...(disabled ? theme.states.disabled : null),
  border: error ? `solid 1px ${theme.colors.danger}` : `solid 1px ${theme.input.backgroundColor}`,
  ':focus': {
    border: error ? `solid 1px ${theme.colors.danger}` : `solid 1px ${theme.colors.accent}`,
  },
  padding,
  borderRadius: theme.border.radius,
  backgroundColor: theme.input.backgroundColor,
  transition: 'border 0.1s',
}), tag, [
  'disabled',
  'name',
  'onChange',
  'placeholder',
  'type',
  'value',
  'maxLength',
  ...passProps,
]);

const StyledInput = create('input');

// TODO: Auto size by default and maxRows.
// github.com/callemall/material-ui/blob/master/src/TextField/EnhancedTextarea.js
const StyledTextarea = create('textarea', ['rows']);

const StyledInputOrTextArea: Styled<InputProps> = ({
  field,
  rows = 1,
  type = 'text',
  ...props
}) => {
  const InputOrTextArea = rows === 1 ? StyledInput : StyledTextarea;
  return (
    <InputOrTextArea
      {...props}
      {...field}
      rows={rows}
      type={type}
    />
  );
};

const checkIfOwnError = (error, name) => error && error.params && error.params.prop === name;

const Input: Styled<InputProps> = ({
  error,
  name,
  placeholder,
  size = 0,
  marginBottom = 0.5,
  ...props
}) => (
  <Box {...props} marginBottom={marginBottom}>
    <StyledInputOrTextArea
      error={checkIfOwnError(error, name) && error}
      placeholder={placeholder}
      size={size}
      {...props}
    />
  </Box>
);

export default Input;
