import React, { PropTypes } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import cx from 'classnames';
import Select from '../../../app/components/Select/index';
import wrapFields, { wrappedFieldsPropTypes } from '../../../lib/wrapFields';
import layoutStyles from '../../../app/styles/layout.scss';
import gridStyles from '../../../app/styles/grid.scss';
import styles from './JobSchedulingFields.scss';

const MESSAGES = defineMessages({
  now: {
    id: 'jobScheduling.now',
    defaultMessage: 'Now'
  },
  later: {
    id: 'jobScheduling.later',
    defaultMessage: 'Later'
  },
  slotSelectLabel: {
    id: 'jobScheduling.slotSelectLabel',
    defaultMessage: '{from} - {to}'
  }
});

export const JobSchedulingShape = PropTypes.shape({
  when: PropTypes.string,
  dayKey: PropTypes.string,
  slotKey: PropTypes.string
});

const DAY_FORMAT_OPTIONS = {
  month: 'long',
  day: 'numeric'
};

const HOUR_FORMAT_OPTIONS = {
  hour: '2-digit',
  minute: '2-digit'
};

const SlotPicker = React.createClass({
  handleDayChange(dayKey) {
    const { slotKeys } = this.props.daysByKey[dayKey];

    this.props.onChange({ dayKey, slotKey: slotKeys[0] });
  },

  handleSlotChange(slotKey) {
    this.props.onChange({ ...this.props.value, slotKey });
  },

  render() {
    const {
      dayKeys,
      daysByKey,
      value: { dayKey, slotKey },
      intl: { formatMessage, formatDate, formatTime }
    } = this.props;
    const { slotKeys, slotsByKey } = daysByKey[dayKey];

    const dayOptions = dayKeys.map(k => {
      const date = new Date(daysByKey[k].date);
      const label = formatDate(date, DAY_FORMAT_OPTIONS);

      return { value: k, label };
    });

    const slotOptions = slotKeys.map(k => {
      const { startTime, endTime } = slotsByKey[k];

      // Ensure that we are formating all the date with the same timezone by
      // creatings dates and settings hours and minutes manually.
      // For example the 29th of october is in the CEST timezone and the 30th of
      // october is in the CET timezone. Calling formatTime will returns
      // different results... We want to display the "human/real" time the
      // driver will arrive.
      //
      //   formatTime('2016-10-29T06:30:00.000Z', HOUR_FORMAT_OPTIONS)
      //   => 9:30 - 9:30
      //   formatTime('2016-10-30T06:30:00.000Z', HOUR_FORMAT_OPTIONS)
      //   => 8:30 - 9:00
      const fromDate = new Date();
      const fromParts = startTime.split(/[T\.\:]/);
      fromDate.setUTCHours(parseInt(fromParts[1], 10), parseInt(fromParts[2], 10)); const toDate = new Date(); const toParts = endTime.split(/[T\.\:]/);
      toDate.setUTCHours(parseInt(toParts[1], 10), parseInt(toParts[2], 10));

      const label = formatMessage(MESSAGES.slotSelectLabel, {
        from: formatTime(fromDate, HOUR_FORMAT_OPTIONS),
        to: formatTime(toDate, HOUR_FORMAT_OPTIONS)
      });

      return { value: k, label };
    });

    return (
      <div className={gridStyles.row}>
        <div className={gridStyles.col6}>
          <Select
            {...this.props}
            id='daySelect'
            name='dayKey'
            value={dayKey}
            options={dayOptions}
            onChange={this.handleDayChange} />
        </div>
        <div className={gridStyles.col6}>
          <Select
            {...this.props}
            id='slotSelect'
            name='slotKey'
            value={slotKey}
            options={slotOptions}
            onChange={this.handleSlotChange} />
        </div>
      </div>
    );
  }
});

const JobSchedulingFields = React.createClass({
  propTypes: {
    ...wrappedFieldsPropTypes,
    value: JobSchedulingShape.isRequired
  },

  handleWhenChange(e) {
    this.props.onChange('when', e.target.value);
  },

  renderWhenCheckbox(key) {
    const isChecked = this.props.value.when === key;
    const classNames = cx(styles.checkbox, styles[`${key}Checkbox`], {
      [styles.checked]: isChecked
    });

    return (
      <label className={classNames}>
        <input
          id={key}
          checked={isChecked}
          name='when'
          onChange={this.handleWhenChange}
          type='radio'
          value={key} />
        <span className={styles.checkboxText}>
          <FormattedMessage {...MESSAGES[key]} />
        </span>
      </label>
    );
  },

  renderDatePicker() {
    const {
      renderers: { renderField },
      dayKeys,
      daysByKey,
      value
    } = this.props;

    if (value.when === 'now') { return; }

    return (
      <div className={layoutStyles.mtm}>
        {renderField(SlotPicker, 'slot', { dayKeys, daysByKey })}
      </div>
    );
  },

  render() {
    return (
      <div>
        {this.renderWhenCheckbox('now')}
        {this.renderWhenCheckbox('later')}

        {this.renderDatePicker()}
      </div>
    );
  }
});

export default wrapFields(JobSchedulingFields, { messages: MESSAGES });
