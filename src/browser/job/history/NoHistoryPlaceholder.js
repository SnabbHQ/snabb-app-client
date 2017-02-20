import React from 'react';
import { Blankslate } from '../../app/components';
import jobMessages from '../../../common/delivery/jobMessages';
import { NewDeliveryButton } from '../components';

function NoHistoryPlaceholder() {
  return (
    <Blankslate
      title={jobMessages.noHistoryJobsTitle}
      subtitle={jobMessages.noHistoryJobsSubtitle}
      actions={
        <NewDeliveryButton />
      }
    />
  );
}

export default NoHistoryPlaceholder;
