import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import analytics from '../../../common/lib/analytics';
import Button from '../../app/components/Button2';

const RequestJobButton = React.createClass({
  propTypes: {
    message: PropTypes.node,
    position: PropTypes.string.isRequired
  },

  contextTypes: {
    router: PropTypes.object.isRequired
  },

  getDefaultProps() {
    return {
      message: <FormattedMessage id='newJobButton' defaultMessage='New job' />
    };
  },

  goToNewJobPage(e) {
    e.preventDefault();

    analytics.track('Clicked new delivery button', {
      category: analytics.DELIVERY_REQUEST_FLOW_CATEGORY,
      position: this.props.position
    });

    this.context.router.push({ pathname: '/new' });
  },

  render() {
    return (
      <Button className='newJobButton' kind='primary' onClick={this.goToNewJobPage}>
        {this.props.message}
      </Button>
    );
  }
});

export default RequestJobButton;
