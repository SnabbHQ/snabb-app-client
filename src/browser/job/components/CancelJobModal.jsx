import React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { ConfirmModal } from '../Modal';
import Button from '../Button';
import layoutStyles from '../../../styles/layout.scss';

const CancelJobModal = React.createClass({
  render() {
    const {
      job,
      cancelation,
      submitState,
      onCancelClick,
      onConfirmClick
    } = this.props;

    const isDisabled = submitState === 'pending';

    let subtitle;
    if (cancelation && cancelation.cancelationFee > 0) {
      const price = (
        <FormattedNumber
          style='currency'
          currency={cancelation.currency.isoCode}
          value={cancelation.cancelationFee} />
      );
      subtitle = (
        <FormattedMessage
          id='cancelJobModalFee'
          defaultMessage='This cancellation will be charged with {price}'
          values={{ price }}/>
      );
    } else {
      subtitle = (
        <FormattedMessage
          id='cancelJobModalNoFee'
          defaultMessage='This cancellation has no fee' />
      );
    }

    const { street, postcode } = job.destinationPlace.address;
    return (
      <ConfirmModal
        isOpen={true}
        buttons={[
          <Button
            id={`cancelJobModalCancelButton-${job.id}`}
            kind='secondary'
            disabled={isDisabled}
            onClick={onCancelClick}
          >
            <FormattedMessage
              id='cancelJobModalCancelButton'
              defaultMessage="No, don't cancel it" />
          </Button>,
          <Button
            id={`cancelJobModalConfirmButton-${job.id}`}
            kind='danger'
            disabled={isDisabled}
            onClick={onConfirmClick}
          >
            <FormattedMessage
              id='cancelJobModalConfirmButton'
              defaultMessage='Yes, cancel it' />
          </Button>
        ]}
      >
        <FormattedMessage
          tagName='p'
          id='cancelJobModalTitle'
          defaultMessage='You’re about to cancel a delivery to' />
        <p><strong>{street || postcode}</strong></p>
        <p className={layoutStyles.mtm}>{subtitle}</p>
      </ConfirmModal>
    );
  }
});

export default CancelJobModal;
