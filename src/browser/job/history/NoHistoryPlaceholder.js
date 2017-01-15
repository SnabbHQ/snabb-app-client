import React from 'react';
import { Blankslate } from '../../app/components';
import jobMessages from '../../../common/job/jobMessages';
import activeBlankslateIcon from '../../../common/app/images/activeBlankslateIcon.svg';
import { NewDeliveryButton } from '../components';

function NoHistoryPlaceholder() {
  return (
    <Blankslate
      icon={activeBlankslateIcon}
      title={jobMessages.noHistoryJobsTitle}
      subtitle={jobMessages.noHistoryJobsSubtitle}
      actions={
        <NewDeliveryButton />
      }
    />
  );
}

export default NoHistoryPlaceholder;
