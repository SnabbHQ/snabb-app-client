/* @flow */
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import messages from '../../common/notfound/messages';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Link, PageHeader, Title, Box } from '../app/components';

const NotFoundPage = ({ intl }) => (
  <Box>
    <Title message={linksMessages.notFound} />
    <PageHeader
      description={intl.formatMessage(messages.p)}
      heading={intl.formatMessage(messages.h1)}
    />
    <Link exactly to="/">
      <FormattedMessage {...messages.continue} />
    </Link>
  </Box>
);

NotFoundPage.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(NotFoundPage);
