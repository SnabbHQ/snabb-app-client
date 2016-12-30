/* @flow */
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';
import { Link, Text, Title, Box } from '../app/components';

const ProfileLink = ({ exactly, to, message }: HeaderLinkProps) => (
  <Link
    antialiasing
    bold
    color="white"
    exactly={exactly}
    marginHorizontal="1.5em"
    to={to}
  >
    <FormattedMessage {...message} />
  </Link>
);


const ProfileDetails = () => (
  <Box display="flex">
    <Title message={linksMessages.profile} />
    <Text>Profile Details</Text>
    <ProfileLink to="/active" message={linksMessages.accountDetails} />
  </Box>
);

export default ProfileDetails;

