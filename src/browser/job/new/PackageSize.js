/* @flow */
import React, { PropTypes } from 'react';
import { Space, Box, Text, Image } from '../../app/components';

const ICONS = {
  small: require('../../../common/app/images/small.svg'),
  medium: require('../../../common/app/images/medium.svg'),
  large: require('../../../common/app/images/large.svg'),
};

type PackageSizeProps = {
  title: string,
  icon: string
}

const PackageSize = ({
  title,
  icon
}: PackageSizeProps) => (
    <Box
      display="flex"
      align="center"
      backgroundColor="gray"
      alignItems="center"
      padding={1}
    >
      <Image
        alt={icon}
        src={ICONS[icon]}
        width={50}
        height={50}
      />
      <Space x={1} />
      <Text>{title}</Text>
    </Box>
  );

export default PackageSize;
