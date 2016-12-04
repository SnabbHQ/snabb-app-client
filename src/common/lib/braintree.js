import braintree from 'braintree-web';

/* Uses Braintree API to obtain `nonce` given credit card data.
 *
 * @param {String} token: Braintree token given by Stuart API
 * @param {Sting} number: card number as a string of digits
 * @param {Sting} cvv: security code
 * @param {Sting} expirationDate: MM/YY format
 *
 * @returns {Promise}
 */
export function getNonce(token, cvv, expirationDate, number) {
  if (number === undefined ||
    expirationDate === undefined ||
    cvv === undefined ) {
    Promise.reject(new Error('Incorrect credit card data provided.'));
  }

  return new Promise((resolve, reject) => {
    braintree.client.create({
      authorization: token
    }, function (error, client) {
      if (error) return reject(error);

      client.request({
        endpoint: 'payment_methods/credit_cards',
        method: 'post',
        data: {
          creditCard: {
            cvv,
            expirationDate,
            number
          }
        }
      }, function (error, response) {
        if (error) return reject(error.error.message);

        resolve(response.creditCards[0].nonce);
      });
    });
  });
}
