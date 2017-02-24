/* @flow */
import React, {PropTypes} from 'react';
import {Space, Button, Text, Image} from '../../app/components';

const ICONS = {
  small: require('../../../common/app/images/small.svg'),
  medium: require('../../../common/app/images/medium.svg'),
  big: require('../../../common/app/images/big.svg'),
};

type PackageSizeProps = {
  disabled: boolean,
  title: string,
  onPress: void,
  id: string,
}

const PackageSize = ({
  disabled = false,
  id,
  onPress,
  title,
}: PackageSizeProps) => {

  const onButtonPress = () => {
    onPress(id);
  };

  return (
    <Button
      disabled={disabled}
      display="flex"
      align="center"
      backgroundColor="gray"
      alignItems="center"
      paddingVertical={2}
      onClick={onButtonPress}
      onPress={onButtonPress}
    >
      <Image
        alt={id}
        src={ICONS[id]}
        width={50}
        height={50}
      />
      <Space x={1} />
      <Text>{title}</Text>
    </Button>
  )
};

export default PackageSize;
