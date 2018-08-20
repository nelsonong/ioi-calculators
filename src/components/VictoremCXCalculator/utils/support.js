import {
  MODELS,
  SENSOR_DRIVE_MODE,
} from '../constants';

const supports2x2Binning = model => MODELS.TYPE_253.includes(model)
  || MODELS.TYPE_255.includes(model)
  || MODELS.TYPE_273.includes(model);

const supportsSubSampling = model => MODELS.TYPE_250.includes(model)
  || MODELS.TYPE_252.includes(model)
  || MODELS.TYPE_253.includes(model)
  || MODELS.TYPE_255.includes(model)
  || MODELS.TYPE_273.includes(model);

const supportsVerticalBinning = model => MODELS.TYPE_250.includes(model)
  || MODELS.TYPE_252.includes(model)
  || MODELS.TYPE_253.includes(model)
  || MODELS.TYPE_255.includes(model);

const isConfiguration = (
  linkSpeed,
  linkCount,
  targetLinkSpeed,
  targetLinkCount,
) => (linkSpeed === targetLinkSpeed) && (linkCount === targetLinkCount);

const supportedBitDepths = ({
  model,
  format,
  sensorDriveMode,
}) => {
  if (MODELS.TYPE_183.includes(model)) {
    const linkSpeed = Number(format.slice(-1));
    const linkCount = Number(format.slice(0, 1));
    const bitDepths = [];
    if (sensorDriveMode === SENSOR_DRIVE_MODE.ALL_12
      || sensorDriveMode === SENSOR_DRIVE_MODE.ALL_10
      || sensorDriveMode === SENSOR_DRIVE_MODE.UHD_10
      || sensorDriveMode === SENSOR_DRIVE_MODE.UHD_10_OC
      || (sensorDriveMode === SENSOR_DRIVE_MODE.BIN_12_16_9
        && (isConfiguration(linkSpeed, linkCount, 6, 2)
        || isConfiguration(linkSpeed, linkCount, 5, 2)
        || isConfiguration(linkSpeed, linkCount, 3, 1)
        || isConfiguration(linkSpeed, linkCount, 2, 1))
      )
      || (sensorDriveMode === SENSOR_DRIVE_MODE.BIN_12
        && (isConfiguration(linkSpeed, linkCount, 6, 2)
        || isConfiguration(linkSpeed, linkCount, 5, 2)
        || isConfiguration(linkSpeed, linkCount, 3, 1)
        || isConfiguration(linkSpeed, linkCount, 2, 1))
      )
    ) {
      bitDepths.push(8);
    }

    if (sensorDriveMode === SENSOR_DRIVE_MODE.ALL_12
      || sensorDriveMode === SENSOR_DRIVE_MODE.ALL_10
      || sensorDriveMode === SENSOR_DRIVE_MODE.UHD_10
      || sensorDriveMode === SENSOR_DRIVE_MODE.UHD_10_OC
      || (sensorDriveMode === SENSOR_DRIVE_MODE.BIN_12_16_9
        && (isConfiguration(linkSpeed, linkCount, 6, 2)
        || isConfiguration(linkSpeed, linkCount, 5, 2)
        || isConfiguration(linkSpeed, linkCount, 3, 1)
        || isConfiguration(linkSpeed, linkCount, 2, 1))
      )
      || (sensorDriveMode === SENSOR_DRIVE_MODE.BIN_12
        && (isConfiguration(linkSpeed, linkCount, 6, 2)
        || isConfiguration(linkSpeed, linkCount, 5, 2)
        || isConfiguration(linkSpeed, linkCount, 3, 1)
        || isConfiguration(linkSpeed, linkCount, 2, 1))
      )
    ) {
      bitDepths.push(10);
    }

    if (sensorDriveMode === SENSOR_DRIVE_MODE.ALL_12
      || sensorDriveMode === SENSOR_DRIVE_MODE.BIN_12_16_9
      || sensorDriveMode === SENSOR_DRIVE_MODE.BIN_12) {
      bitDepths.push(12);
    }

    return bitDepths;
  }

  return [8, 10, 12];
};

export {
  supports2x2Binning,
  supportsVerticalBinning,
  supportsSubSampling,
  supportedBitDepths,
};
