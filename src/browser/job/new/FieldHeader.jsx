/* @flow */
import React, { PropTypes } from 'react';
import { Box, Heading, Grid } from '../../app/components';
import { Image } from '../../app/components-old';

const FieldHeader = ({ icon, title }) => (
  <Box>
    <Grid>
      <Image
        alt={title}
        mt={2}
        src={icon}
      />
    </Grid>
    <Grid pt={2} ml={2}>
      <Heading size={1}>
        {title}
      </Heading>
    </Grid>
  </Box>
  );

FieldHeader.propTypes = {
  icon: PropTypes.string.isRequired,
  title: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.string,
  ]).isRequired,
};

export default FieldHeader;
