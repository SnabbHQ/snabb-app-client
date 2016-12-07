/* @flow */
import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import analytics from '../../../common/lib/analytics';
import {PrimaryButton} from '../../app/components';

type Props = {
  disabled?: boolean,
  style?: any,
  message: string
};

const RequestNewDeliveryButton = ({ disabled, style, message, ...props }: Props, { rebass, router }: Object) => {
  const sx = {
    ...style,
    ...(disabled && rebass.states.disabled),
  }

  function goToNewJobPage(e) {
    e.preventDefault();

    // TODO
    // analytics.track('Clicked new delivery button', {
    //   category: analytics.DELIVERY_REQUEST_FLOW_CATEGORY,
    //   position: this.props.position
    // })

    router.transitionTo('/new');
  }

  return (
    <PrimaryButton {...props} disabled={disabled} style={sx} onClick={goToNewJobPage}>
      {message}
    </PrimaryButton>
  );
};

RequestNewDeliveryButton.defaultProps = {
  message: <FormattedMessage id='newDeliveryButton' defaultMessage='Request a Delivery' />
}

RequestNewDeliveryButton.contextTypes = {
  rebass: PropTypes.object,
  router: PropTypes.object.isRequired
};

export default RequestNewDeliveryButton;
