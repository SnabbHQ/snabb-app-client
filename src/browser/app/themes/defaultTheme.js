/* @flow */
import type { Theme } from './types';
import openColor from './openColor';

const theme: Theme = {
  baseline() {
    return this.fontSize * this.lineHeight;
  },
  rhythm(ratio: number) {
    return this.baseline() * ratio;
  },
  fontSize: 16,
  lineHeight: 1.5,
  fontSizeModularScale: 1.5, //modularscale.com
  colors: {
    // TODO: Leverage openColor.
    primary: openColor.gray9,
    secondary: openColor.gray4,
    accent: openColor.blue5,
    info: openColor.blue7,
    infoHover: openColor.blue5,
    success: '#1c7',
    warning: '#f70',
    danger: '#f52',
    black: openColor.gray8,
    white: '#fff',
    gray: openColor.gray4,
    open: openColor,
  },
  border: {
    radius: 2,
    width: 1,
  },
  states: {
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
    },
  },
  text: {
    bold: 600,
    // www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    // lineHeight: typography.lineHeight,
  },
  heading: {
    bold: 700,
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    marginBottom: 0,
  },
  paragraph: {
    marginBottom: 1,
    maxWidth: '42em',
  },
};

export default theme;
