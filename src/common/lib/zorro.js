const DIGIT_REGEXP = /^\d$/;
const LETTER_REGEXP = /^[A-Za-z]$/;
const ALPHANNUMERIC_REGEXP = /^[\dA-Za-z]$/;

const DEFAULT_FORMATTERS = {
  1: (v) => DIGIT_REGEXP.test(v) && v,
  a: (v) => LETTER_REGEXP.test(v) && v,
  '*': (v) => ALPHANNUMERIC_REGEXP.test(v) && v,
};

const DEFAULT_FORMATTER = (v) => v.replace(/^\//, '');

/**
 * Create a function that format a string for a given mask
 *
 * @param {String} mask The mask to use to format.
 *  - 1: is any number
 *  - a: is any letter
 *  - *: is any number or letter
 *
 * @returns {Function}
 */
export default function zorro(mask) {
  const maskParts = mask.match(/(\/?.)/g).map((key) => {
    if (DEFAULT_FORMATTERS[key]) {
      return {
        key,
        format: DEFAULT_FORMATTERS[key],
      };
    } else {
      return {
        key: 'default',
        format: DEFAULT_FORMATTER.bind(null, key),
      };
    }
  });

  return (value) => {
    let formattedValue = '';

    let valueIndex = 0;
    const valueParts = value.split('');

    for (let maskIndex = 0; maskIndex < maskParts.length; maskIndex++) {
      const { key, format } = maskParts[maskIndex];

      const v = valueParts[valueIndex];
      if (v == null) { break; }

      const f = format(v);
      if (f === false) { break; }

      const isDefault = key === 'default';
      if ((isDefault && v === f) || !isDefault) {
        valueIndex++;
      }

      formattedValue += f;
    }

    return formattedValue.trim();
  };
}
