import creditCardType from 'credit-card-type';

export const DEFAULT_CARD_TYPE = 'unknown';
export const DEFAULT_CODE_NAME = 'CVV';
const DEFAULT_CODE_MAX = 4;
const DEFAULT_CARD_NUMBER_MASK = '1111111111111111';

/* Given a credit card number, returns the type
 *
 * @param {String} cardNumber: the string to be analyzed, mainly numbers
 *
 * @returns {String} one of the following:
 *                    - visa
 *                    - master-card
 *                    - american-express
 *                    - diners-club
 *                    - discover
 *                    - jcb
 *                    - unionpay
 *                    - maestro
 */
export function getCardType(cardNumber) {
  cardNumber = cardNumber.replace(/\D+/g, ''); // remove all but numbers

  const types = creditCardType(cardNumber);

  if (types.length === 1) {
    return types[0].type;
  } else {
    return DEFAULT_CARD_TYPE;
  }
}

/* Given a credit card type, returns the name for the card code
 *
 * @param {String} cardType: a card type
 *
 * @returns {String} one of the following: CVV, CVC, CID, CVN
 */
export function getCardCodeName(cardType) {
  const info = creditCardType.getTypeInfo(cardType);

  if (!info) {
    return DEFAULT_CODE_NAME;
  }

  return info.code.name;
}

/* Returns mask string for the card code
 *
 * @param {String} cardType: a card type
 *
 * @returns {String} usually either '111' or '1111'
 */
export function cardCodeMask(cardType) {
  let max = DEFAULT_CODE_MAX;
  const info = creditCardType.getTypeInfo(cardType);

  if (info && info.code) {
    max = info.code.size;
  }

  return new Array(max + 1).join('1');
}

/* Returns a card number mask depending on type, '1111 1111 1111 1111' by default
 *
 * @param {String} cardType: a card type
 *
 * @returns {String} card number mask
 */
export function cardNumberMask(cardType) {
  if (!cardType || cardType === DEFAULT_CARD_TYPE) {
    return DEFAULT_CARD_NUMBER_MASK;
  }

  const { gaps, lengths } = creditCardType.getTypeInfo(cardType);
  const max = Math.max(...lengths);
  const offsets = [0].concat(gaps).concat([max]);
  const components = [];

  for (let i = 0; offsets[i] < max; i++) {
    const start = offsets[i];
    const end = Math.min(offsets[i + 1], max);
    const ones = new Array(end - start + 1).join('1');
    components.push(ones);
  }

  return components.join(' ');
}
