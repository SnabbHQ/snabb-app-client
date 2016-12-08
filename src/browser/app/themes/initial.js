/* @flow */

/*
  Styling
    - jxnblk.com/writing/posts/patterns-for-style-composition-in-react
    - medium.com/@yoniweisbrod/a-mini-course-on-react-native-flexbox-2832a1ccc6
    - Default rebass theme: github.com/jxnblk/rebass/blob/master/src/config.js
*/

const typography = {
  // www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide
  fontFamily: '"Source Sans Pro", sans-serif', // minimal set
  monospace: '"Roboto Mono", Menlo, Consolas, monospace',
  fontSizes: [48, 32, 24, 20, 16, 14, 12],
  lineHeight: 1.5,
  bold: 600,
  scale: [0, 8, 16, 32, 64], // rhythm
};

const colors = {
  primary: '#000',
  primaryLight: '#323232',
  secondary: '#888',
  accent: '#08e',
  info: '#08e',
  success: '#1c7',
  warning: '#f70',
  error: '#f52',
  // only grayscale
  black: '#333',
  gray: '#ddd',
  white: '#fff',
};

const borders = {
  borderRadius: 2,
  borderColor: 'rgba(0, 0, 0, .25)',
};

const inverted = colors.white;

const zIndex = [0, 2, 4, 8, 16];

const states = {
  disabled: { cursor: 'default', opacity: 0.5 },
};

const theme = {
  ...typography,
  colors,
  ...borders,
  inverted,
  zIndex,
  states,
};

export const compute = (theme: Object) => ({
  ...theme,

  link: {
    color: theme.colors.accent,
    bold: { fontWeight: theme.bold },
    link: { textDecoration: 'none' },
    hover: { textDecoration: 'none' },
    active: { textDecoration: 'none' },
  },

  Divider: {
    backgroundColor: theme.colors.gray,
    height: 1
  },

  Container: {
    maxWidth: 'auto',
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: theme.colors.white,
    color: theme.colors.black, // inherited
    fontFamily: theme.fontFamily, // inherited
    fontSize: theme.fontSizes[4], // inherited
    lineHeight: theme.lineHeight, // inherited
  },

  Toolbar: {
    color: 'inherit',
    backgroundColor: theme.colors.primary,
    borderBottom: `1px solid rgba(0, 0, 0, ${1/8})`,
    padding: theme.scale[2],
  },

  Label: {
    color: theme.colors.grey
  },

  button: {
    backgroundColor: 'blue'
  }
});

export default compute(theme);
