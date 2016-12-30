import React from 'react';
import { Blankslate } from '../../app/components-old';
import jobMessages from '../../../common/job/jobMessages';
import activeBlankslateIcon from '../../../../assets/images/activeBlankslateIcon.svg';
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
