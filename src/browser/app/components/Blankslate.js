/* @flow */
import React, { PropTypes } from 'react';
import { Image, Box, Text, Full } from './';
import { FormattedMessage } from 'react-intl';

type Props = {
  icon?: string,
  actions?: any,
  subtitle: Object,
  title: Object,
}

const Blankslate = ({ icon, actions, title, subtitle }: Props) => {
  const renderIcon = () => (
    icon &&
    <Box display="flex" justifyContent="center">
      <Image alt="Blankslate Icon" src={icon} width={60} height={60} />
    </Box>
  );

  const renderActions = () => (
    actions && <Box display="flex" justifyContent="center">{actions}</Box>
  );

  return (
    <Full>
      <Box>
        {renderIcon()}
        <Text
          size={2}
          align="center"
          display="block"
        >
          <FormattedMessage {...title} />
        </Text>
        <Text align="center"><FormattedMessage {...subtitle} /></Text>
        {renderActions()}
      </Box>
    </Full>
  );
};

Blankslate.propTypes = {
  title: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.string,
  ]).isRequired,
  subtitle: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.string,
  ]).isRequired,
  icon: PropTypes.string,
  actions: PropTypes.object,
};

export default Blankslate;
