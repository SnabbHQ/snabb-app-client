/**
 * # BackendFactory.js
 *
 * Mocked BackendFactory
 *
 *
 */
'use strict'

// TODO - As we don't have a backend yet lets use the mocked version of our API
// import Backend from './Backend'
import SnabbApi from '../SnabbApi'

export default function BackendFactory (token = null) {
  return new SnabbApi(token)
}
