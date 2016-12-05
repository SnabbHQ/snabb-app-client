import React, { PropTypes } from 'react';
import Tether from 'react-tether';
import camelCase from 'lodash/camelCase';
import styles from './Dropdown.scss';
import menuStyles from '../../../styles/menu.scss';

const OPPOSITE_POSITION = {
  left: 'right',
  right: 'left',
  top: 'bottom',
  bottom: 'top',
  middle: 'middle',
  center: 'center'
};

const Dropdown = React.createClass({
  propTypes: {
    position: PropTypes.string,
    className: PropTypes.string,
    buttonClassName: PropTypes.string,
    menuClassName: PropTypes.string
  },

  getDefaultProps() {
    return {
      position: 'bottom left'
    };
  },

  getInitialState() {
    return {
      isOpen: false
    };
  },

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick, false);
  },

  open() {
    this.setState({ isOpen: true });

    document.addEventListener('click', this.handleDocumentClick, false);
  },

  close() {
    this.setState({ isOpen: false });

    document.removeEventListener('click', this.handleDocumentClick, false);
  },

  closeAnd(props, e) {
    this.close();

    if (typeof props.onClick === 'function') {
      props.onClick(e);
    }
  },

  toggle() {
    if (this.state.isOpen) {
      this.close();
    } else {
      this.open();
    }
  },

  handleDocumentClick(e) {
    const { button, menu } = this.refs;

    // Bails out if user client on/inside the button/menu.
    if (e.target === menu || menu.contains(e.target)) { return; }
    if (e.target === button || button.contains(e.target)) { return; }

    this.close();
  },

  renderButton() {
    const { button, buttonClassName } = this.props;

    return React.cloneElement(button, {
      ref: 'button',
      className: [button.props.className, buttonClassName, styles.button].join(' '),
      onClick: this.toggle
    });
  },

  renderMenu() {
    if (!this.state.isOpen) { return; }

    return (
      <div ref='menu' className={[this.props.menuClassName, menuStyles.menu].join(' ')}>
        <div className={menuStyles.items}>
          {this.renderItems()}
        </div>
      </div>
    );
  },

  renderItems() {
    const { children } = this.props;

    return React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === Item) {
        return React.cloneElement(child, { onClick: this.closeAnd.bind(null, child.props) });
      } else {
        return <Item>{child}</Item>;
      }
    });
  },

  render() {
    const { position, className } = this.props;

    const oppositePosition = position.split(' ');
    oppositePosition[0] = OPPOSITE_POSITION[oppositePosition[0]];

    return(
      <Tether
        attachment={oppositePosition.join(' ')}
        targetAttachment={position}
        className={[className, menuStyles.menuContainer, menuStyles[camelCase(position)]].join(' ')}
      >
        {this.renderButton()}
        {this.renderMenu()}
      </Tether>
    );
  }
});

export const Item = React.createClass({
  propTypes: {
    tagName: PropTypes.string,
    iconSrc: PropTypes.string
  },

  getDefaultProps() {
    return {
      tagName: 'a'
    };
  },

  render() {
    const {
      className,
      iconSrc,
      tagName
    } = this.props;

    let { children } = this.props;
    if (iconSrc) {
      children = [<img key='icon' className={menuStyles.itemIcon} src={iconSrc} />, children];
    }

    return React.createElement(tagName, {
      ...this.props,
      className: [className, menuStyles.item].join(' ')
    }, children);
  }
});

export default Dropdown;
