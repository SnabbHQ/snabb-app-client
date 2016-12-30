/* @flow */
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';
import { Link, Title, Box } from '../app/components';

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


const ProfileDetailsPage = () => (
  <Box display="flex">
    <Title message={linksMessages.profile} />
    <ProfileLink to="/active" message={linksMessages.accountDetails} />
  </Box>
);

export default ProfileDetailsPage;

