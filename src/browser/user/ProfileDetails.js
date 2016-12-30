/* @flow */
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { Text, Card, Input, Image, Title, Box } from '../app/components';

// $FlowFixMe
const logo = require('../../../assets/images/clientPhotoDefaultMedium.svg');

const ProfileDetails = () => (
  <Box>
    <Title message={linksMessages.profile} />
    <Card>
      <Text>Business Information</Text>
      <Image
        alt="Profile Image"
        height={50}
        width={50}
        src={logo}
      />
      <Input
        name="Business Name"
        label="Business Name"
        labelSize={-1}
        maxLength={100}
        placeholder={''}
        type="text"
      />
      <Text>General Information</Text>
      <Box display="flex">
        <Input
          name="Business Name"
          label="Business Name"
          labelSize={-1}
          maxLength={100}
          placeholder={''}
          type="text"
        />
        <Input
          name="Business Name"
          label="Business Name"
          labelSize={-1}
          maxLength={100}
          placeholder={''}
          type="text"
        />
      </Box>
      <Box display="flex">
        <Input
          name="Business Name"
          label="Business Name"
          labelSize={-1}
          maxLength={100}
          placeholder={''}
          type="text"
        />
        <Input
          name="Business Name"
          label="Business Name"
          labelSize={-1}
          maxLength={100}
          placeholder={''}
          type="text"
        />
      </Box>
    </Card>

    <Card>
      <Text>Change your password</Text>
      <Box display="flex">
        <Input
          name="Business Name"
          label="Business Name"
          labelSize={-1}
          maxLength={100}
          placeholder={''}
          type="text"
        />
        <Input
          name="Business Name"
          label="Business Name"
          labelSize={-1}
          maxLength={100}
          placeholder={''}
          type="text"
        />
      </Box>
    </Card>
  </Box>
);

export default ProfileDetails;

