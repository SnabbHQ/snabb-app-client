import React, { PropTypes } from 'react';
import ReactAutocomplete from 'react-autocomplete';
import debounce from 'lodash/debounce';
import controlsStyles from '../controls/Controls.scss';
import menuStyles from '../../../styles/menu.scss';

function renderMenu(items, value, style) {
  if (items.length === 0) { return <noscript />; }

  return (
    <div className={menuStyles.menuContainer} style={{ minWidth: style.minWidth, position: 'absolute' }}>
      <div className={menuStyles.menu}>
        <div className={menuStyles.items}>
          {items}
        </div>
      </div>
    </div>
  );
}

function renderItem(item, isHighlighted) {
  const classes = [menuStyles.item];
  if (isHighlighted) {
    classes.push(menuStyles.itemHighlighted);
  }
  return (
    <div key={`item-${item.id}`} className={classes.join(' ')}>
      {item.description}
    </div>
  );
}

function getStateFromProps(props) {
  const items = props.value ? [] : props.defaultItems;

  return {
    inputValue: props.getItemValue(props.value) || '',
    items
  };
}

const Autocomplete = React.createClass({
  propTypes: {
    defaultItems: PropTypes.array,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    getItems: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.object
  },

  getDefaultProps() {
    return {
      defaultItems: [],
      getItemValue(item) {
        return item && item.description;
      },
      renderItem
    };
  },

  getInitialState() {
    return getStateFromProps(this.props);
  },

  componentDidMount() {
    this.debouncedGetItems = debounce(this.getItems, 200);
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.value === nextProps.value) { return; }

    this.setState(getStateFromProps(nextProps));
  },

  handleInputBlur() {
    this.setState(getStateFromProps(this.props));
  },

  handleSelect(inputValue, item) {
    this.setState({ inputValue });
    this.props.onChange(item);
  },

  handleChange(event, inputValue) {
    this.setState({ inputValue });
    this.debouncedGetItems(inputValue);
  },

  getItems(inputValue) {
    inputValue = inputValue.trim();

    if (inputValue.length === 0) {
      this.setState({ items: this.props.defaultItems });
    } else {
      this.props.getItems(inputValue).then((items) => {
        this.setState({ items });
      });
    }
  },

  render() {
    return (
      <ReactAutocomplete
        {...this.props}
        inputProps={{
          id: this.props.id,
          className: [controlsStyles.textInput, this.props.className].join(' '),
          name: this.props.name,
          placeholder: this.props.placeholder,
          autoComplete: 'off'
        }}
        wrapperStyle={{}}
        wrapperProps={{
          className: this.props.wrapperClassName
        }}
        renderMenu={renderMenu}
        onBlur={this.handleInputBlur}
        onSelect={this.handleSelect}
        onChange={this.handleChange}
        value={this.state.inputValue}
        items={this.state.items} />
    );
  }
});

export default Autocomplete;
