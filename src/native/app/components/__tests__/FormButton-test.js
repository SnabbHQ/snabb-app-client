/**
 * # FormButton-test.js
 *
 * This class tests that the form button displays correctly
 *
 * *Note:* if you want to understand the structures here, add a
 * ```console.log``` and then ```npm test```.
 */


/** This is due to the fact that NativeBase does not support yet jest. Mock until it does
 * https://github.com/GeekyAnts/NativeBase/issues/272 **/
jest.mock('Button', () => 'Button');

/**
* ## Imports
 */
import React from 'react';
import FormButton from '../FormButton';
import renderer from 'react/lib/ReactTestRenderer';

it('FormButton', () => {
  const props = {
    isDisabled: false,
    onPress: () => {},
    buttonText: 'TestString',
  };
  const tree = renderer.create(<FormButton {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
