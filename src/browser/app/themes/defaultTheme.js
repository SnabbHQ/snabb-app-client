/* @flow */
import type { Theme } from './types';
import openColor from './openColor';
import typography from './typography';

// www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/
// Taken from from Bootstrap 4.
export const defaultFontFamily = [
  'ClearSans',
  '-apple-system',
  'system-ui',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
].join(', ');

const theme: Theme = {
  typography: typography({
    // For text 14px and small text 12px use 14px with 1,16666 fontSizeScale
    fontSize: 14,
    fontSizeScale: 'step5', // perfect fourth, modularscale.com
    lineHeight: 24,
  }),
  colors: {
    primary: openColor.blue7,
    primaryHover: openColor.blue5,
    secondary: '#37beff',
    accent: '#00aaff',
    success: '#1c7',
    warning: '#f70',
    danger: '#d40619',
    black: '#000',
    white: '#fff',
    gray: openColor.gray4,
    open: openColor,
  },
  body: {
    backgroundColor: 'white',
  },
  border: {
    radius: 8,
    width: 1,
  },
  states: {
    active: {
      darken: 0.2,
    },
    disabled: {
      cursor: 'default',
      opacity: 0.5,
    },
  },
  container: {
    maxWidths: {
      small: 540,
      medium: 720,
      big: 960,
      bigger: 1140,
      full: '100%',
    },
  },
  text: {
    bold: 600,
    // www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide
    fontFamily: defaultFontFamily,
  },
  block: {
    marginBottom: 1,
    maxWidth: 21,
  },
  heading: {
    bold: 700,
    fontFamily: defaultFontFamily,
    marginBottom: 1,
  },
  paragraph: {
    marginBottom: 1,
    maxWidth: 42,
  },
  input: {
    radius: 5,
    backgroundColor: '#f6f6f6',
  },
  divider: {
    borderColor: openColor.gray4,
  },
};

export default theme;
