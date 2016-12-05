import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './Table.scss';
import LoadingMessage from '../LoadingMessage/index';

const Table = React.createClass({
  propTypes: {
    cellClassName: PropTypes.string,
    className: PropTypes.string,
    columns: PropTypes.arrayOf(PropTypes.shape({
      className: PropTypes.string,
      headerClassName: PropTypes.string,
      name: PropTypes.node.isRequired,
      renderer: PropTypes.func.isRequired
    })).isRequired,
    hasMore: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onLoadMoreClick: PropTypes.func.isRequired,
    onRowClick: PropTypes.func,
    rows: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number
    })).isRequired,
    rowProps: PropTypes.object
  },

  getDefaultProps() {
    return {
      rowProps: {}
    };
  },

  handleLoadMoreClick(e) {
    e.preventDefault();

    this.props.onLoadMoreClick();
  },

  renderHeadersRow() {
    const headers = this.props.columns.map(({ name, headerClassName }, id) => {
      const c = [styles.header, headerClassName].join(' ');
      return <th key={`header-${id}`} className={c}>{name}</th>;
    });

    return <tr>{headers}</tr>;
  },

  renderRows() {
    const { rows, columns, cellClassName } = this.props;

    return rows.map((row) => {
      const cells = columns.map(({ renderer, className }, id) => {
        const c = [styles.cell, cellClassName, className].join(' ');
        return (
          <td key={`row-${row.id}-${id}`} className={c}>
            {renderer(row, this.props.rowProps)}
          </td>
        );
      });
      const { onRowClick } = this.props;
      const handleRowClick = onRowClick && onRowClick.bind(null, row);

      return <tr key={`row-${row.id}`} onClick={handleRowClick}>{cells}</tr>;
    });
  },

  renderFooter() {
    if (this.props.isLoading) {
      return (
        <LoadingMessage className={styles.loadMore} />
      );
    }

    if (this.props.hasMore) {
      return (
        <a href='#' onClick={this.handleLoadMoreClick} className={styles.loadMore}>
          <FormattedMessage id='loadMore' defaultMessage='Load more' />
        </a>
      );
    }
  },

  render() {
    return (
      <table className={[styles.table, this.props.className].join(' ')}>
        <thead>
        {this.renderHeadersRow()}
        </thead>
        <tbody>
        {this.renderRows()}
        </tbody>
        <tfoot>
        <tr>
          <td colSpan={this.props.columns.length}>{this.renderFooter()}</td>
        </tr>
        </tfoot>
      </table>
    );
  }
});

export default Table;
