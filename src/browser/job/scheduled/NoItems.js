import React from 'react';
import { Blankslate } from '../../app/components-old';
import jobMessages from '../../../common/job/jobMessages';
import activeBlankslateIcon from '../../../common/app/images/activeBlankslateIcon.svg';
import { NewDeliveryButton } from '../components';

function NoItems() {
  return (
    <Blankslate
      icon={activeBlankslateIcon}
      title={jobMessages.noScheduledJobsTitle}
      subtitle={jobMessages.noScheduledJobsSubTitle}
      actions={
        <NewDeliveryButton />
      }
    />
  );
}

export default NoItems;
