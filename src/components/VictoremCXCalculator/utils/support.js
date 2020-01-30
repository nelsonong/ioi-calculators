import {
  MODELS,
  SENSOR_DRIVE_MODE,
  SUBSAMPLING_BINNING,
} from '../constants';

const supports2x2Binning = model => MODELS.TYPE_253.includes(model)
  || MODELS.TYPE_255.includes(model)
  || MODELS.TYPE_273.includes(model)
  || MODELS.TYPE_505.includes(model);

const supportsSubSampling = model => MODELS.TYPE_250.includes(model)
  || MODELS.TYPE_252.includes(model)
  || MODELS.TYPE_253.includes(model)
  || MODELS.TYPE_255.includes(model)
  || MODELS.TYPE_265.includes(model)
  || MODELS.TYPE_273.includes(model)
  || MODELS.TYPE_305.includes(model)
  || MODELS.TYPE_505.includes(model);

const supportsVerticalBinning = model => MODELS.TYPE_250.includes(model)
  || MODELS.TYPE_252.includes(model)
  || MODELS.TYPE_253.includes(model)
  || MODELS.TYPE_255.includes(model)
  || MODELS.TYPE_505.includes(model);

const supportsHorizontalBinning = model => MODELS.TYPE_253.includes(model)
|| MODELS.TYPE_255.includes(model)
|| MODELS.TYPE_273.includes(model)
|| MODELS.TYPE_505.includes(model);

const isConfiguration = (
  linkSpeed,
  linkCount,
  targetLinkSpeed,
  targetLinkCount,
) => (linkSpeed === targetLinkSpeed) && (linkCount === targetLinkCount);

const supportsOutputBitDepth = (model, subSamplingBinning, linkSpeed, linkCount) => {
  if (!MODELS.TYPE_253.includes(model)) return false;
  if (subSamplingBinning !== SUBSAMPLING_BINNING.NONE) return false;
  if (isConfiguration(linkSpeed, linkCount, 6, 2)) return false;
  return true;
};

const supportedBitDepths = ({
  model,
  format,
  sensorDriveMode,
}) => {
  const adcBitDepths = [];
  if (MODELS.TYPE_183.includes(model)) {
    const linkSpeed = Number(format.slice(-1));
    const linkCount = Number(format.slice(0, 1));
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
      adcBitDepths.push(8);
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
      adcBitDepths.push(10);
    }

    if (sensorDriveMode === SENSOR_DRIVE_MODE.ALL_12
      || sensorDriveMode === SENSOR_DRIVE_MODE.BIN_12_16_9
      || sensorDriveMode === SENSOR_DRIVE_MODE.BIN_12) {
      adcBitDepths.push(12);
    }

    return adcBitDepths;
  }

  // All other models
  if (!MODELS.TYPE_174.includes(model) && !MODELS.TYPE_505.includes(model)) {
    adcBitDepths.push(8);
  }

  if (!MODELS.TYPE_505.includes(model)) {
    adcBitDepths.push(10);
  }

  adcBitDepths.push(12);

  return adcBitDepths;
};

export {
  supports2x2Binning,
  supportsVerticalBinning,
  supportsHorizontalBinning,
  supportsSubSampling,
  supportsOutputBitDepth,
  supportedBitDepths,
};
