// @flow
import type { TextProps } from './Text';
import type { IntlShape as $IntlShape } from 'react-intl';
import React from 'react';
import Text from './Text';
import Title from './Title';
import { defineMessages, injectIntl } from 'react-intl';

const messages = defineMessages({
  loadingText: {
    defaultMessage: 'Loading',
    id: 'loading.loadingText',
  },
  longLoadingText: {
    defaultMessage: 'Still loading, please check your connection',
    id: 'loading.longLoadingText',
  },
});

type LoadingProps = TextProps & {
  intl: $IntlShape,
};

type LoadingState = {|
  currentText: ?Object,
  |};

class Loading extends React.Component {
  state: LoadingState = {
    currentText: null,
  };

  componentDidMount() {
    // www.nngroup.com/articles/response-times-3-important-limits
    this.timer = setTimeout(() => {
      this.setState({ currentText: messages.loadingText });
    }, 1000);
    this.longTimer = setTimeout(() => {
      this.setState({ currentText: messages.longLoadingText });
    }, 10000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    clearTimeout(this.longTimer);
  }

  timer: number;
  longTimer: number;
  props: LoadingProps;

  render() {
    const { currentText } = this.state;
    if (!currentText) return null;
    const {
      intl,
      display = 'block',
      ...props
    } = this.props;

    return (
      <Text display={display} {...props}>
        <Title message={currentText} />
        {intl.formatMessage(currentText)}...
      </Text>
    );
  }
}

export default injectIntl(Loading);
