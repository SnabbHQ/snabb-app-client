/* @flow */
import React from 'react';
import type { Styled } from '../themes/types';
import type { TextProps } from './Text';
import Text from './Text';
import styled from './styled';
import { FormattedMessage } from 'react-intl';
import { Box, Image } from '../../app/components';

type FieldHeaderProps = {
  icon?: string,
  title: Object,
}

const StyledHeader: Styled<TextProps> = styled((theme, props) => ({
  $extends: Text,
  display: props.display || 'block',
  fontFamily: theme.heading.fontFamily,
  fontWeight: props.bold === undefined ? 'bold' : props.bold ? theme.text.bold : 'normal',
  marginBottom: '7px',
}));

const FieldHeader = ({ icon, title }: FieldHeaderProps) => (
  <Box display="flex" alignItems="center" marginBottom="1em">
    {
      icon &&
      <Box marginRight="1em">
        <Image alt={title} src={icon} />
      </Box>
    }
    <StyledHeader size={1}>
      <FormattedMessage {...title} />
    </StyledHeader>
  </Box>
);

export default FieldHeader;
