import React, { PropTypes } from 'react';
import { Button } from '../../app/components';
import { FormattedMessage } from 'react-intl';
import jobMessages from '../../../common/job/jobMessages';

export default function NewDeliveryButton({}, { router }: Object) {
  const onButtonClick = () => {
    // TODO
    // analytics.track('Clicked new delivery button', {
    //   category: analytics.DELIVERY_REQUEST_FLOW_CATEGORY,
    //   position: this.props.position
    // })

    router.transitionTo('/new');
  };

  return (
    <Button
      bold
      size={0}
      accent
      onClick={onButtonClick}
    >
      <FormattedMessage {...jobMessages.newDelivery} />
    </Button>
  );
}

NewDeliveryButton.contextTypes = {
  router: PropTypes.object.isRequired,
};
