/* @flow */
import React from "react";
import linksMessages from "../../common/app/linksMessages";
import { Title, Box } from "../app/components";

const ProfilePage = () => (
  <Box display="flex">
    <Title message={linksMessages.profile} />
  </Box>
);

export default ProfilePage;

