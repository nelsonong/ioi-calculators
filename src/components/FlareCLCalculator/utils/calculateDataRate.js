import { FORMAT_BITS } from '../constants';

export default ({
  mode,
  format,
  width,
  height,
  subSampling,
  frameRate,
}) => {
  const dvrMultiplier = mode ? 1.01 : 1.0;
  const bytesPerPixel = FORMAT_BITS[format] / 8;
  const subSamplingDivider = subSampling ? 4 : 1;
  const dataRate = (dvrMultiplier * frameRate * width * height * bytesPerPixel)
    / subSamplingDivider / (1024 * 1024);
  return dataRate.toFixed(2);
};
