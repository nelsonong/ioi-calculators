import {
  MODELS,
  SENSOR_DRIVE_MODE,
} from '../constants';

const isConfiguration = (
  linkSpeed,
  linkCount,
  targetLinkSpeed,
  targetLinkCount,
) => (linkSpeed === targetLinkSpeed) && (linkCount === targetLinkCount);

const calculateMinWidth = (model) => {
  if (MODELS.TYPE_183.includes(model)) return 32;
  return 64;
};

const calculateMaxWidth = ({
  model,
  format,
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
    if (MODELS.TYPE_174.includes(model)) {
      return 1920;
    }

    if (MODELS.TYPE_250.includes(model)) {
      return 2432;
    }

    if (MODELS.TYPE_252.includes(model) || MODELS.TYPE_265.includes(model)) {
      return 2048;
    }

    if (MODELS.TYPE_253.includes(model) || MODELS.TYPE_255.includes(model) || MODELS.TYPE_305.includes(model)) {
      return 4096;
    }

    if (MODELS.TYPE_505.includes(model)) {
      return 5120;
    }
  }

  return 0;
};

const calculateMinHeight = () => 8;

const calculateMaxHeight = ({
  model,
  sensorDriveMode,
}) => {
  if (MODELS.TYPE_183.includes(model)) {
    switch (sensorDriveMode) {
      case SENSOR_DRIVE_MODE.ALL_12:
      case SENSOR_DRIVE_MODE.ALL_10:
        return 3648;

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
    if (MODELS.TYPE_174.includes(model)) {
      return 1216;
    }

    if (MODELS.TYPE_250.includes(model)) {
      return 2048;
    }

    if (MODELS.TYPE_252.includes(model) || MODELS.TYPE_265.includes(model)) {
      return 1536;
    }

    if (MODELS.TYPE_253.includes(model)) {
      return 3008;
    }

    if (MODELS.TYPE_255.includes(model) || MODELS.TYPE_305.includes(model)) {
      return 2176;
    }

    if (MODELS.TYPE_505.includes(model)) {
      return 5120;
    }
  }

  return 0;
};

const calculateWidthStep = (model) => {
  if (MODELS.TYPE_183.includes(model)) return 32;
  return 64;
};

const calculateHeightStep = () => 8;

export {
  calculateMinWidth,
  calculateMaxWidth,
  calculateMinHeight,
  calculateMaxHeight,
  calculateWidthStep,
  calculateHeightStep,
};
