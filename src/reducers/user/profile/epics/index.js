import { combineEpics } from 'redux-observable';
import getProfileEpic from './getProfileEpic';

export default combineEpics(
  getProfileEpic
)