/* @flow */
import React from 'react';
import linksMessages from '../../../common/app/linksMessages';
import profileMessages from '../../../common/user/profile/profileMessages';
import { Text, FieldHeader, Card, Input, Image, Title, Box } from '../../app/components';

// $FlowFixMe
const logo = require('../../../../assets/images/clientPhotoDefaultMedium.svg');

const ProfileDetails = () => (
  <Box>
    <Title message={linksMessages.profile} />
    <Card>
      <FieldHeader title={profileMessages.businessInfo} />
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
      <FieldHeader title={profileMessages.generalInfo} />
      <Box display="flex">
        <Input
          name="Contact Name"
          label="Contact Name"
          labelSize={-1}
          maxLength={100}
          placeholder={''}
          type="text"
        />
        <Input
          name="Contact Last Name"
          label="Contact Last Name"
          labelSize={-1}
          maxLength={100}
          placeholder={''}
          type="text"
        />
      </Box>
      <Box display="flex">
        <Input
          name="Business Email"
          label="Business Email"
          labelSize={-1}
          maxLength={100}
          placeholder={''}
          type="text"
        />
        <Input
          name="Business Phone"
          label="Business Phone"
          labelSize={-1}
          maxLength={100}
          placeholder={''}
          type="text"
        />
      </Box>
    </Card>

    <Card>
      <FieldHeader title={profileMessages.changePassword} />
      <Text>Change your password</Text>
      <Box display="flex">
        <Input
          name="Current Password"
          label="Current Password"
          labelSize={-1}
          maxLength={100}
          placeholder={''}
          type="text"
        />
        <Input
          name="New Password"
          label="New Password"
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

