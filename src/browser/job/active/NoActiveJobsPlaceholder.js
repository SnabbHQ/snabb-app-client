import React from 'react';
import { Blankslate } from '../../app/components';
import jobMessages from '../../../common/job/jobMessages';
import activeBlankslateIcon from '../../../common/app/images/activeBlankslateIcon.svg';
import { NewDeliveryButton } from '../components';

function NoActiveJobsPlaceholder() {
  return (
    <Blankslate
      icon={activeBlankslateIcon}
      title={jobMessages.noActiveJobsTitle}
      subtitle={jobMessages.noActiveJobsSubtitle}
      actions={
        <NewDeliveryButton />
      }
    />
  );
}

export default NoActiveJobsPlaceholder;
