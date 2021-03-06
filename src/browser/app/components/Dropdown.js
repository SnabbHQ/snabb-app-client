/* @flow */
import type {Styled} from '../themes/types';
import type {TextProps} from './Text';
import Box from './Box';
import React from 'react';
import styled from './styled';
import Text from './Text';

export type DropdownProps = TextProps & {
  disabled?: boolean,
  error?: string,
  label?: string,
  ref?: any,
  name?: string,
  options?: Array,
}

const create = (tag) => styled((theme, {
  disabled,
  rows,
  error,
  padding = 1,
  ...props,
}) => ({
  $extends: Text,
  ...(disabled ? theme.states.disabled : null),
  border: `solid 1px ${theme.input.backgroundColor}`,
  ':focus': {
    border: `solid 1px ${theme.colors.accent}`,
  },
  padding,
  backgroundColor: theme.input.backgroundColor,
  transition: 'border 0.3s',
}), tag, [
  'disabled',
  'name',
  'innerRef',
  'options',
]);

const StyledDropdown = create(
  ({ options = [] }) => (
    <select>
      { options.map(option => <option value={option} >{option}</option>) }
    </select>
  ),
);

const Dropdown: Styled<DropdownProps> = ({
  label,
  size = -1,
  marginBottom = 0.33,
  ...props
}) => (
  <Box {...props} marginBottom={marginBottom} >
    {label &&
    <Text display="block" size={size} >
      {label.toUpperCase()}
    </Text>
    }
    <StyledDropdown
      {...props}
    />
  </Box>
);

export default Dropdown;
