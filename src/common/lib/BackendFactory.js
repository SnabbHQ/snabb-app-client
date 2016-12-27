/**
 * # BackendFactory
 *
 * This class sets up the backend by checking the config.js
 *
 */
import SnabbApi from './SnabbApi';

export default function BackendFactory(token = null) {
  return new SnabbApi(token);
}
