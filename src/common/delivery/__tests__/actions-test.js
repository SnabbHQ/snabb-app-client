import * as actions from '../actions';

describe('All Delivery actions', () => {

  describe('Validate Address', () => {
    it('should validate Adress', () => {
      const options = { address: 'example' };
      expect(actions. validateAddress(options)).toEqual({
        type: 'VALIDATE_ADDRESS',
        payload: { options } ,
      });
    });

    it('should validateAddressSuccess', () => {
      const place = {
        address: "This is an address",
        coordinate: {
          latitude: 0,
          longitude: 0
        },
        placeType: "pickup"
      };
      expect(actions.validateAddressSuccess(place)).toEqual({
        type: 'VALIDATE_ADDRESS_SUCCESS',
        payload: { place }
      });
    });

    it('should validateAddressFail', () => {
      const error = Error;
      const placeType = "pickup";
      expect(actions.validateAddressFail(placeType, error)).toEqual({
        type: 'VALIDATE_ADDRESS_FAIL',
        payload: { placeType, error }
      });
    });
  });

  describe('Create Quotes', () => {
    const pickupPlace = {
      address: "This is an address",
      coordinate: {
        latitude: 0,
        longitude: 0
      },
      placeType: "pickup"
    };

    const dropoffPlace = {
      address: "This is an address",
      coordinate: {
        latitude: 0,
        longitude: 0
      },
      placeType: "pickup"
    };

    it('should createQuote', () => {
      expect(actions.createQuote({ pickupPlace, dropoffPlace })).toEqual({
        type: 'CREATE_QUOTE',
        payload: { options: { pickupPlace, dropoffPlace } }
      });
    });

    it('should createQuoteSuccess', () => {
      const quote= {
        quoteId: 1234,
        distance: 0,
        expireAt: 123543,
        quoteUser: 34,
        tasks: [
          {
            taskId: 1234,
          }
        ],
      };
      expect(actions.createQuoteSuccess(quote)).toEqual({
        type: 'CREATE_QUOTE_SUCCESS',
        payload: { quote } ,
      });
    });

    it('should getProfileFail', () => {
      const error = Error;
      expect(actions.createQuoteFail(error)).toEqual({
        type: 'CREATE_QUOTE_FAIL',
        payload: { error } ,
      });
    });
  });
});
