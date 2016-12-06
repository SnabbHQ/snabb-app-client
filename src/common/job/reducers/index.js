/* @flow */
import closestCity from './closestCity';
import closestDriver from './closestDrivers';
import jobs from './jobs';
import newJob from './newJob';

const reducers = [
  closestCity,
  closestDriver,
  jobs,
  newJob,
]

export default reducers
