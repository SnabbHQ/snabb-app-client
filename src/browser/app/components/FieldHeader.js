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
  height?: number,
  title: any,
}

const StyledHeader: Styled<TextProps> = styled((theme, props) => ({
  $extends: Text,
  display: props.display || 'block',
  fontFamily: theme.heading.fontFamily,
  fontWeight: props.bold === undefined ? 'bold' : props.bold ? theme.text.bold : 'normal',
  marginBottom: '7px',
}));

const FieldHeader = ({
  icon,
  title,
  height = 40,
}: FieldHeaderProps) => (
  <Box display="flex" alignItems="center" marginBottom={1}>
    {
      icon &&
      <Box marginRight={1}>
        <Image alt={title} src={icon} height={height} />
      </Box>
    }
    <StyledHeader size={1}>
      <FormattedMessage {...title} />
    </StyledHeader>
  </Box>
);

export default FieldHeader;
