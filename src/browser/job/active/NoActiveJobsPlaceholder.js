import React from 'react';
import { Blankslate } from '../../app/components';
import jobMessages from '../../../common/delivery/jobMessages';
import { NewDeliveryButton } from '../components';

function NoActiveJobsPlaceholder() {
  return (
    <Blankslate
      title={jobMessages.noActiveJobsTitle}
      subtitle={jobMessages.noActiveJobsSubtitle}
      actions={
        <NewDeliveryButton />
      }
    />
  );
}

export default NoActiveJobsPlaceholder;
