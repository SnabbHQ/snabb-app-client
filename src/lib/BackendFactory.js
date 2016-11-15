/**
 * # BackendFactory
 *
 * This class sets up the backend by checking the config.js
 *
 */
'use strict'

import CONFIG from './config'
import Hapi from './Hapi'
import SnabbApi from './SnabbApi'

export default function BackendFactory(token = null) {
  return new SnabbApi(token)
  // if (CONFIG.backend.hapiLocal || CONFIG.backend.hapiRemote) {
  //   return new Hapi(token)
  // }
}
