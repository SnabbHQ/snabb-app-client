import React, { PropTypes } from 'react';
import { Button } from '../../app/components';
import { FormattedMessage } from 'react-intl';
import jobMessages from '../../../common/job/jobMessages';
import styled from '../../app/components/styled';

const CustomButton = styled((theme) => ({
  $extends: Button,
  color: theme.colors.white,
  backgroundColor: theme.colors.primary,
  ':hover': {
    backgroundColor: theme.colors.primaryHover,
  },
}), 'button', ['onClick']);

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
    <CustomButton onClick={onButtonClick}>
      <FormattedMessage {...jobMessages.newDelivery} />
    </CustomButton>
  );
}

NewDeliveryButton.contextTypes = {
  router: PropTypes.object.isRequired,
};
