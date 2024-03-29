import {
  MODELS,
  SUBSAMPLING_BINNING,
  SENSOR_DRIVE_MODE,
} from '../constants';

const isConfiguration = (
  linkSpeed,
  linkCount,
  targetLinkSpeed,
  targetLinkCount,
) => (linkSpeed === targetLinkSpeed) && (linkCount === targetLinkCount);

const calculateMinWidth = (model) => {
  if (MODELS.TYPE_174.includes(model)) return 32;
  if (MODELS.TYPE_183.includes(model)) return 32;
  if (MODELS.TYPE_287.includes(model)) return 8;
  if (MODELS.TYPE_0505.includes(model)) return 32;
  if (MODELS.TYPE_2509.includes(model)) return 32;
  return 16;
};

const calculateMaxWidth = ({
  model,
  format,
  subSamplingBinning,
  sensorDriveMode,
}) => {
  const linkSpeed = Number(format.slice(-1));
  const linkCount = Number(format.slice(0, 1));
  if (MODELS.TYPE_183.includes(model)) {
    switch (sensorDriveMode) {
      case SENSOR_DRIVE_MODE.ALL_12:
      case SENSOR_DRIVE_MODE.ALL_10:
        return 5472;

      case SENSOR_DRIVE_MODE.UHD_10:
        return 4096;

      case SENSOR_DRIVE_MODE.UHD_10_OC:
        if (isConfiguration(linkSpeed, linkCount, 3, 1) || isConfiguration(linkSpeed, linkCount, 2, 1)) {
          return 4128;
        }

        return 4096;

      case SENSOR_DRIVE_MODE.BIN_12_16_9:
      case SENSOR_DRIVE_MODE.BIN_12:
        return 2736;

      default:
        return 0;
    }
  } else {
    const subSampling = (subSamplingBinning === SUBSAMPLING_BINNING.SUBSAMPLING);
    const binh = (subSamplingBinning === SUBSAMPLING_BINNING.BIN_HORIZONTAL);
    const binv = (subSamplingBinning === SUBSAMPLING_BINNING.BIN_VERTICAL);
    const bin2 = (subSamplingBinning === SUBSAMPLING_BINNING.BIN_2X2);
    if (MODELS.TYPE_174.includes(model)) {
      return 1936;
    }

    if (MODELS.TYPE_250.includes(model)) {
      return subSampling ? 1232 : 2464;
    }

    if (MODELS.TYPE_252.includes(model) || MODELS.TYPE_265.includes(model)) {
      if (subSampling) {
        return 1032;
      }

      if (binv) {
        return 2464;
      }

      return 2064;
    }

    if (MODELS.TYPE_253.includes(model) || MODELS.TYPE_255.includes(model) || MODELS.TYPE_305.includes(model)) {
      if (subSampling || bin2) {
        return 2056;
      }

      return 4112;
    }

    if (MODELS.TYPE_273.includes(model)) {
      if (subSampling || bin2) {
        return 728;
      }

      return 1456;
    }

    if (MODELS.TYPE_287.includes(model)) {
      return 720;
    }

    if (MODELS.TYPE_0505.includes(model)) {
      return 5120;
    }

    if (MODELS.TYPE_2509.includes(model)) {
      return 4224;
    }
  }

  return 0;
};

const calculateMinHeight = () => 4;

const calculateMaxHeight = ({
  model,
  subSamplingBinning,
  sensorDriveMode,
}) => {
  if (MODELS.TYPE_183.includes(model)) {
    switch (sensorDriveMode) {
      case SENSOR_DRIVE_MODE.ALL_12:
      case SENSOR_DRIVE_MODE.ALL_10:
        return 3672;

      case SENSOR_DRIVE_MODE.UHD_10:
      case SENSOR_DRIVE_MODE.UHD_10_OC:
        return 2168;

      case SENSOR_DRIVE_MODE.BIN_12_16_9:
        return 1548;

      case SENSOR_DRIVE_MODE.BIN_12:
        return 1836;

      default:
        return 0;
    }
  } else {
    const subSampling = (subSamplingBinning === SUBSAMPLING_BINNING.SUBSAMPLING);
    const binv = (subSamplingBinning === SUBSAMPLING_BINNING.BIN_VERTICAL);
    const bin2 = (subSamplingBinning === SUBSAMPLING_BINNING.BIN_2X2);
    if (MODELS.TYPE_174.includes(model)) {
      return 1216;
    }

    if (MODELS.TYPE_250.includes(model)) {
      if (subSampling || binv) {
        return 1028;
      }

      return 2056;
    }

    if (MODELS.TYPE_252.includes(model) || MODELS.TYPE_265.includes(model)) {
      if (subSampling || binv) {
        return 772;
      }

      return 1544;
    }

    if (MODELS.TYPE_253.includes(model)) {
      if (subSampling || binv || bin2) {
        return 1504;
      }

      return 3008;
    }

    if (MODELS.TYPE_255.includes(model) || MODELS.TYPE_305.includes(model)) {
      if (subSampling || binv || bin2) {
        return 1088;
      }

      return 2176;
    }

    if (MODELS.TYPE_273.includes(model)) {
      if (subSampling || binv || bin2) {
        return 544;
      }

      return 1088;
    }

    if (MODELS.TYPE_287.includes(model)) {
      return 544;
    }

    if (MODELS.TYPE_0505.includes(model)) {
      return 5120;
    }

    if (MODELS.TYPE_2509.includes(model)) {
      return 2160;
    }
  }

  return 0;
};

const calculateWidthStep = model => calculateMinWidth(model);

const calculateHeightStep = () => calculateMinHeight();

export {
  calculateMinWidth,
  calculateMaxWidth,
  calculateMinHeight,
  calculateMaxHeight,
  calculateWidthStep,
  calculateHeightStep,
};
