import React, { PropTypes } from 'react';
import { defineMessages } from 'react-intl';
import cx from 'classnames';
import Place from '../Place';
import wrapFields, { wrappedFormPropTypes } from '../../lib/wrapFields';
import layoutStyles from '../../../styles/layout.scss';

const MESSAGES = defineMessages({
  originCommentPlaceholder: {
    id: 'editJob.pickUpComment',
    defaultMessage: 'Pick up comment'
  },
  destinationCommentPlaceholder: {
    id: 'editJob.dropOffComment',
    defaultMessage: 'Drop off comment'
  }
});

const EditJobShape = PropTypes.shape({
  pickUpComment: PropTypes.string,
  dropOffComment: PropTypes.string
});

const EditJobFields = React.createClass({
  propTypes: {
    ...wrappedFormPropTypes,
    value: EditJobShape.isRequired
  },

  render() {
    const {
      renderers: { renderText },
      pickUpPlace,
      dropOffPlace
    } = this.props;

    return (
      <div>
        <Place place={pickUpPlace} showComment={false} />
        <div className={cx(layoutStyles.phl, layoutStyles.mbl)}>
          {renderText('originComment')}
        </div>

        <Place place={dropOffPlace} showComment={false} />
        <div className={cx(layoutStyles.phl)}>
          {renderText('destinationComment')}
        </div>
      </div>
    );
  }
});

export default wrapFields(EditJobFields, { messages: MESSAGES });
