import Dimensions from "Dimensions";

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;

export const LATITUDE = 39.4699 // Valencia as default
export const LONGITUDE = 0.3763
export const LATITUDE_DELTA = 0.01
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
export const LATITUDE_OFFSET = -0.0015