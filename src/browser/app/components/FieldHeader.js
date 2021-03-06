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
  iconHeight?: number,
  title: any,
  titleSize?: number,
}

const StyledHeader: Styled<TextProps> = styled((theme, props) => ({
  $extends: Text,
  display: props.display || 'block',
  fontFamily: theme.heading.fontFamily,
  fontWeight: props.bold === undefined ? 'bold' : props.bold ? theme.text.bold : 'normal',
}));

const FieldHeader = ({
  icon,
  iconHeight = 40,
  title,
  titleSize = 1,
  marginRight = 1,
  marginBottom = 1
}: FieldHeaderProps) => (
  <Box display="flex" alignItems="center" marginBottom={marginBottom}>
    {
      icon &&
      <Box marginRight={marginRight}>
        <Image alt={title} src={icon} height={iconHeight} />
      </Box>
    }
    <StyledHeader size={titleSize}>
      <FormattedMessage {...title} />
    </StyledHeader>
  </Box>
);

export default FieldHeader;
