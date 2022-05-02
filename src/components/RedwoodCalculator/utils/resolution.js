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
  if (MODELS.TYPE_3265.includes(model) || MODELS.TYPE_45000.includes(model)) return 64;
  return 64;
};

const calculateMaxWidth = ({ model }) => {
  if (MODELS.TYPE_3265.includes(model)) {
    return 9344;
  }

  if (MODELS.TYPE_45000.includes(model)) {
    return 8192;
  }

  if (MODELS.TYPE_12000.includes(model)) {
    return 4096;
  }

  return 0;
};

const calculateMinHeight = () => 4;

const calculateMaxHeight = ({ model }) => {
  if (MODELS.TYPE_3265.includes(model)) {
    return 7000;
  }

  if (MODELS.TYPE_45000.includes(model)) {
    return 5468;
  }

  if (MODELS.TYPE_12000.includes(model)) {
    return 3072;
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
