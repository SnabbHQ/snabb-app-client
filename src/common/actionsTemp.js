import { browserHistory } from 'react-router';
import reduce from 'lodash/reduce';
import storage from '../lib/storage';
import * as authUtils from '../lib/authUtils';
import analytics from '../lib/analytics';
import {
  ACTIVE_JOB_STATUSES,
  CITIES,
  DEFAULT_PLACE_STORAGE_KEY,
  HISTORY_JOB_STATUSES,
  JOB_TYPES,
  PLACE_TYPES,
  POLL_QUOTES_INTERVAL,
  SCHEDULED_JOB_STATUSES,
  TRANSPORT_TYPES
} from '../constants';

const emptyFunction = () => {};



