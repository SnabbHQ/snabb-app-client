/* @flow */
import React from 'react';
import profileMessages from '../../../common/user/profile/profileMessages';
import buttonMessages from '../../../common/app/buttonsMessages';
import { FormattedMessage } from 'react-intl';
import { FieldHeader, Button, Space, Input, Image, Box } from '../../app/components';

// $FlowFixMe
const logo = require('../../../common/app/images/clientPhotoDefaultMedium.svg');

const BusinessInfoField = () => (
  <Box>
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
      <Box width="50%">
        <Input
          name="Contact Name"
          label="Contact Name"
          labelSize={-1}
          maxLength={100}
          placeholder={''}
          type="text"
        />
      </Box>
      <Box width="50%">
        <Input
          name="Contact Last Name"
          label="Contact Last Name"
          labelSize={-1}
          maxLength={100}
          placeholder={''}
          type="text"
        />
      </Box>


    </Box>
    <Box display="flex">
      <Box width="50%">
        <Input
          name="Business Email"
          label="Business Email"
          labelSize={-1}
          maxLength={100}
          placeholder={''}
          type="text"
        />
      </Box>
      <Box width="50%">
        <Input
          name="Business Phone"
          label="Business Phone"
          labelSize={-1}
          maxLength={100}
          placeholder={''}
          type="text"
        />
      </Box>
    </Box>
    <Box display="flex">
      <Space auto />
      <Button>
        <FormattedMessage {...buttonMessages.cancel} />
      </Button>
      <Button>
        <FormattedMessage {...buttonMessages.save} />
      </Button>
    </Box>
  </Box>
);

export default BusinessInfoField;

