import { combineEpics } from 'redux-observable'
import getProfile from './getProfile'
import updateProfile from './updateProfile'

export default combineEpics(
  getProfile,
  updateProfile
)