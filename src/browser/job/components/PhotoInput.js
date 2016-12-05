import React from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import cx from 'classnames';
import omit from 'lodash/omit';
import styles from './PhotoInput.scss';
import clientPhotoDefaultMedium from '../../../assets/images/clientPhotoDefaultMedium.svg';

const PhotoInput = React.createClass({
  getInitialState() {
    const { value } = this.props;

    return {
      url: value ? `${value}?w=60&h=60&fit=crop` : clientPhotoDefaultMedium,
      isDragged: false
    };
  },

  readFile(file) {
    const reader = new FileReader();
    const handleLoad = () => {
      this.setState({ url: reader.result });

      const base64 = reader.result.split(',')[1];
      this.props.onChange(base64);

      reader.removeEventListener('load', handleLoad);
    };
    reader.addEventListener('load', handleLoad, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  },

  handleDragIn(e) {
    e.preventDefault();

    this.setState({ isDragged: true });
  },

  handleDragOut(e) {
    e.preventDefault();

    this.setState({ isDragged: false });
  },

  handleInputChange(e) {
    this.readFile(e.target.files[0]);
  },

  handleDrop(e) {
    e.stopPropagation();
    e.preventDefault();

    this.setState({ isDragged: false });

    this.readFile(e.dataTransfer.files[0]);
  },

  renderLabelMessage() {
    if (this.state.isDragged) {
      return (
        <FormattedMessage
          id='fileUpload.helpDragged'
          defaultMessage='Drop your file here' />
      );
    }

    return (
      <FormattedHTMLMessage
        id='fileUpload.help'
        defaultMessage='<strong>Choose a file</strong> or drag it here' />
    );
  },

  render() {
    // Remove value so that input component is not controlled
    const propsWithoutValue = omit(this.props, 'value');

    const inputId = `input-${this.props.name}`;

    return (
      <div
        className={cx(styles.container, { [styles.dragged]: this.state.isDragged })}
        onDragOver={this.handleDragIn}
        onDragEnter={this.handleDragIn}
        onDragEnd={this.handleDragOut}
        onDragLeave={this.handleDragOut}
        onDrop={this.handleDrop}>
        <input
          {...propsWithoutValue}
          id={inputId}
          className={styles.input}
          type='file'
          onChange={this.handleInputChange} />
        <div className={styles.preview}>
          <img className={styles.image} src={this.state.url} />
          <label className={styles.label} htmlFor={inputId}>
            {this.renderLabelMessage()}
          </label>
        </div>
      </div>
    );
  }
});

export default PhotoInput;
