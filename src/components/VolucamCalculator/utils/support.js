import {
  FIRMWARE,
  MODELS,
  SENSOR_DRIVE_MODE,
} from '../constants';

const isGpixel = model => MODELS.TYPE_0505.includes(model) || MODELS.TYPE_2509.includes(model);

export default ({
  model,
  firmware,
  sensorDriveMode,
}) => {
  let adcBitDepths = [];
  if (MODELS.TYPE_183.includes(model)) {
    if (sensorDriveMode === SENSOR_DRIVE_MODE.ALL_12 || sensorDriveMode === SENSOR_DRIVE_MODE.ALL_10) {
      adcBitDepths.push(8);
    }

    if (sensorDriveMode === SENSOR_DRIVE_MODE.ALL_12 || sensorDriveMode === SENSOR_DRIVE_MODE.ALL_10) {
      adcBitDepths.push(10);
    }

    if (sensorDriveMode === SENSOR_DRIVE_MODE.ALL_12) {
      adcBitDepths.push(12);
    }

    return adcBitDepths;
  }

  // All other models
  if (!MODELS.TYPE_174.includes(model) && !isGpixel(model)) {
    adcBitDepths.push(8);
  }

  if (!isGpixel(model)) {
    adcBitDepths.push(10);
  }

  adcBitDepths.push(12);

  // Check compression type
  if (firmware === FIRMWARE.COMPRESSED_12) {
    adcBitDepths = adcBitDepths.filter(adcBitDepth => adcBitDepth >= 12);
  } else if (firmware === FIRMWARE.COMPRESSED_10) {
    adcBitDepths = adcBitDepths.filter(adcBitDepth => adcBitDepth >= 10);
  }

  return adcBitDepths;
};
