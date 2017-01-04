/* @flow */
import type { Theme } from './types';
import openColor from './openColor';
import typography from './typography';

// www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/
// Taken from from Bootstrap 4.
export const fontFamily = [
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
    fontSize: 16,
    fontSizeScale: 'step5', // perfect fourth, modularscale.com
    lineHeight: 24,
  }),
  colors: {
    primary: openColor.blue7,
    primaryHover: openColor.blue5,
    secondary: openColor.gray4,
    accent: openColor.blue5,
    success: '#1c7',
    warning: '#f70',
    danger: '#f52',
    black: openColor.gray8,
    white: '#fff',
    gray: openColor.gray4,
    open: openColor,
    bodyBackground: 'white',
  },
  border: {
    radius: 2,
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
    fontFamily: fontFamily,
  },
  block: {
    maxWidth: '42em',
  },
  heading: {
    bold: 700,
    fontFamily: fontFamily,
    marginBottom: 1,
  },
  paragraph: {
    marginBottom: 1,
    maxWidth: '42em',
  },
  input: {
    borderColor: `solid 1px ${openColor.gray4}`,
  },
  divider: {
    borderColor: openColor.gray4,
  },
};

export default theme;
