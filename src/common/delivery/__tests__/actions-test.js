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
        placeType: "pickUp"
      };
      expect(actions.validateAddressSuccess(place)).toEqual({
        type: 'VALIDATE_ADDRESS_SUCCESS',
        payload: { place }
      });
    });

    it('should validateAddressFail', () => {
      const error = Error;
      const placeType = "pickUp";
      expect(actions.validateAddressFail(placeType, error)).toEqual({
        type: 'VALIDATE_ADDRESS_FAIL',
        payload: { placeType, error }
      });
    });
  });

  describe('Create Quotes', () => {
    const pickUpPlace = {
      address: "This is an address",
      coordinate: {
        latitude: 0,
        longitude: 0
      },
      placeType: "pickUp"
    };

    const dropOffPlace = {
      address: "This is an address",
      coordinate: {
        latitude: 0,
        longitude: 0
      },
      placeType: "pickUp"
    };

    it('should createQuote', () => {
      expect(actions.createQuote({ pickUpPlace, dropOffPlace })).toEqual({
        type: 'CREATE_QUOTE',
        payload: { options: { pickUpPlace, dropOffPlace } }
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
