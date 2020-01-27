import {
  MODELS,
  SUBSAMPLING_BINNING,
} from '../constants';

export default ({
  model,
  outputBitDepth,
  subSamplingBinning,
  width,
  height,
  frameRate,
}) => {
  const bytesPerPixel = outputBitDepth / 8;
  let dataRate = (width * height * frameRate * bytesPerPixel) / (1024 * 1024);

  if (!MODELS.TYPE_505.includes(model)) {
    dataRate *= 1.01;
  }

  return dataRate.toFixed(2);
};
