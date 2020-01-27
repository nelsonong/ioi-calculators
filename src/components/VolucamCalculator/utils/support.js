import {
  MODELS,
  SENSOR_DRIVE_MODE,
} from '../constants';

export default ({
  model,
  sensorDriveMode,
}) => {
  const adcBitDepths = [];
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
  if (!MODELS.TYPE_174.includes(model)) {
    adcBitDepths.push(8);
  }

  adcBitDepths.push(10);
  adcBitDepths.push(12);
  return adcBitDepths;
};
