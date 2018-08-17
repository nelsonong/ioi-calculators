import {
  MODELS,
  FORMAT,
  SUBSAMPLING_BINNING,
} from '../constants';

const calculateMinWidth = (model) => {
  if (MODELS.TYPE_287.includes(model)) return 8;
  return 16;
};

const calculateMaxWidth = ({
  model,
  format,
  bitDepth,
  subSamplingBinning,
}) => {
  const linkSpeed = Number(format.slice(-1));
  const linkCount = Number(format.slice(0, 1));
  const binv = (subSamplingBinning === SUBSAMPLING_BINNING.BIN_VERTICAL);
  const bin2 = (subSamplingBinning === SUBSAMPLING_BINNING.BIN_2X2);
  const bin0 = !binv && !bin2;
  const subSampling = (subSamplingBinning === SUBSAMPLING_BINNING.SUBSAMPLING);
  if (MODELS.TYPE_250.includes(model)) {
    if (subSampling) {
      if (bin0) return 1232;
      return 0;
    }

    if (binv) {
      return MODELS.TYPE_MONO.includes(model) ? 2464 : 0;
    }

    if (bitDepth === 10 && format === FORMAT.CXP3x2) {
      return 1232;
    }

    if (bitDepth === 10 && format === FORMAT.CXP6x1) {
      return 1232;
    }

    if (bitDepth === 12 && format === FORMAT.CXP2x2) {
      return 2200;
    }

    return 2464;
  }

  if (MODELS.TYPE_252.includes(model)) {
    if (subSampling) {
      if (bin0) return 1032;
      return 0;
    }

    if (binv) {
      return MODELS.TYPE_MONO.includes(model) ? 2464 : 0;
    }

    return 2064;
  }

  if (MODELS.TYPE_253.includes(model) || MODELS.TYPE_255.includes(model)) {
    if (subSampling) {
      if (bin0) return 2056;
      return 0;
    }

    if (binv) {
      return MODELS.TYPE_MONO.includes(model) ? 4112 : 0;
    }

    if (bin2) {
      return 2056;
    }

    return 4112;
  }

  if (MODELS.TYPE_273.includes(model)) {
    if (subSampling) {
      if (bin0) return 728;
      return 0;
    }

    if (binv) {
      return MODELS.TYPE_MONO.includes(model) ? 728 : 0;
    }

    if (bin2) {
      return 728;
    }

    return 1456;
  }

  if (MODELS.TYPE_287.includes(model)) {
    if (subSampling) return 0;
    if (subSamplingBinning !== SUBSAMPLING_BINNING.NONE) return 0;
    if (linkCount === 2) return 0;
    if (linkSpeed === 5 || linkSpeed === 6) return 0;
    return 728;
  }

  return 0;
};

const calculateMinHeight = model => 4;

const calculateMaxHeight = ({
  model,
  format,
  bitDepth,
  subSamplingBinning,
}) => {
  const linkSpeed = Number(format.slice(-1));
  const linkCount = Number(format.slice(0, 1));
  const binv = (subSamplingBinning === SUBSAMPLING_BINNING.BIN_VERTICAL);
  const bin2 = (subSamplingBinning === SUBSAMPLING_BINNING.BIN_2X2);
  const bin0 = !binv && !bin2;
  const subSampling = (subSamplingBinning === SUBSAMPLING_BINNING.SUBSAMPLING);
  if (MODELS.TYPE_250.includes(model)) {
    if (subSampling) {
      if (bin0) return 1028;
      return 0;
    }

    if (binv) {
      return MODELS.TYPE_MONO.includes(model) ? 1028 : 0;
    }

    return 2056;
  }

  if (MODELS.TYPE_252.includes(model)) {
    if (subSampling) {
      if (bin0) return 772;
      return 0;
    }

    if (binv) {
      return MODELS.TYPE_MONO.includes(model) ? 772 : 0;
    }

    if (bitDepth === 12 && format === FORMAT.CXP6x2) {
      return 1080;
    }

    if (bitDepth === 12 && format === FORMAT.CXP5x2) {
      return 1080;
    }

    return 1544;
  }

  if (MODELS.TYPE_253.includes(model)) {
    if (subSampling) {
      if (bin0) return 1504;
      return 0;
    }

    if (binv) {
      return MODELS.TYPE_MONO.includes(model) ? 1504 : 0;
    }

    if (bin2) {
      return 1504;
    }

    return 3008;
  }

  if (MODELS.TYPE_255.includes(model)) {
    if (subSampling) {
      if (bin0) return 1088;
      return 0;
    }

    if (binv) {
      return MODELS.TYPE_MONO.includes(model) ? 1088 : 0;
    }

    if (bin2) {
      return 1088;
    }

    return 2176;
  }

  if (MODELS.TYPE_273.includes(model)) {
    if (subSampling) {
      if (bin0) return 544;
      return 0;
    }

    if (binv) {
      return MODELS.TYPE_MONO.includes(model) ? 544 : 0;
    }

    if (bin2) {
      return 544;
    }

    return 1088;
  }

  if (MODELS.TYPE_287.includes(model)) {
    if (subSampling) return 0;
    if (subSamplingBinning !== SUBSAMPLING_BINNING.NONE) return 0;
    if (linkCount === 2) return 0;
    if (linkSpeed === 5 || linkSpeed === 6) return 0;
    return 544;
  }

  return 0;
};

const calculateWidthStep = model => calculateMinWidth(model);

const calculateHeightStep = model => calculateMinHeight(model);

export {
  calculateMinWidth,
  calculateMaxWidth,
  calculateMinHeight,
  calculateMaxHeight,
  calculateWidthStep,
  calculateHeightStep,
};
