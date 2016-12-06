/* @flow */
import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import analytics from '../../../common/lib/analytics';
import {Button} from '../../app/components';

type Props = {
  disabled?: boolean,
  style?: any,
  message: string
};

const RequestJobButton = ({ disabled, style, message, ...props }: Props, { rebass, router }: Object) => {
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
    <Button {...props} disabled={disabled} backgroundColor={'accent'} style={sx} onClick={goToNewJobPage}>
      {message}
    </Button>
  );
};

RequestJobButton.defaultProps = {
  message: <FormattedMessage id='newJobButton' defaultMessage='New job' />
}

RequestJobButton.contextTypes = {
  rebass: PropTypes.object,
  router: PropTypes.object.isRequired
};

export default RequestJobButton;
