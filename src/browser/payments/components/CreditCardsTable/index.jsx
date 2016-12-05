import React from 'react';
import { FormattedMessage } from 'react-intl';
import map from 'lodash/map';
import Button from '../../components/Button';
import style from './CreditCardsTable.scss';

const CREDIT_CARD_ICONS = {
  AX: require('../../../assets/images/cardIconAX.svg'),
  DC: require('../../../assets/images/cardIconDC.svg'),
  DS: require('../../../assets/images/cardIconDS.svg'),
  MC: require('../../../assets/images/cardIconMC.svg'),
  TO: require('../../../assets/images/cardIconTO.svg'),
  VI: require('../../../assets/images/cardIconVI.svg')
};

const CreditCardsTable = React.createClass({
  handleClickDefault(cardId) {
    this.props.defaultCreditCard(cardId).catch(() => {
      window.alert('There was an error making this the default card');
    });
  },

  handleClickDelete(cardId) {
    // TODO: use custom confirm component with i18n.
    //       react-intl's defineMessages and injectIntl may be useful.
    //       PT#126674309
    if (window.confirm('Are you sure you want to delete this card?')) {
      this.props.deleteCreditCard(cardId).catch(() => {
        window.alert('There was an error deleting the card');
      });
    }
  },

  renderCreditCards() {
    const { creditCards } = this.props;

    return map(creditCards, (creditCard) => {
      let defaultText = null;
      const expiresText = (
        <FormattedMessage
          id='creditCardTable.expiresCard'
          defaultMessage='Expires {month}/{year}'
          values={{ month: creditCard.month, year: creditCard.year }}/>
      );

      if (creditCard.isDefault) {
        defaultText = (
          <FormattedMessage
            id='creditCardTable.defaultCard'
            defaultMessage='Default card' />
        );
      }

      return (
        <li key={creditCard.id} className={style.cardItem}>
          <div className={style.cardSetDefault}>
            <input
              type='radio'
              onChange={this.handleClickDefault.bind(null, creditCard.id)}
              checked={creditCard.isDefault} />
          </div>
          <div className={style.cardIcon}>
            <img src={CREDIT_CARD_ICONS[creditCard.creditCardType.code]} />
          </div>
          <div className={style.cardName}>
            {creditCard.name || `.... .... .... ${creditCard.pan}`}
          </div>
          <div className={style.cardExpiryDate}>
            {expiresText}
          </div>
          <div className={style.cardIsDefault}>
            {defaultText}
          </div>
          <div className={style.cardDelete}>
            <Button
              onClick={this.handleClickDelete.bind(null, creditCard.id)}
              kind='transparent'>
              <FormattedMessage
                id='creditCardTable.deleteButton'
                defaultMessage='Delete' />
            </Button>
          </div>
        </li>
      );
    });
  },

  render() {
    return (
      <ul id='creditCardList'>
        {this.renderCreditCards()}
      </ul>
    );
  }
});

export default CreditCardsTable;
