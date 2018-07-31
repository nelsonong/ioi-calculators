import { FORMAT_BITS } from '../constants';

export default ({
  format,
  width,
  height,
  subSampling,
  frameRate,
}) => {
  const bytesPerPixel = FORMAT_BITS[format] / 8;
  const subSamplingDivider = subSampling ? 4 : 1;
  const dataRate = (1.01 * frameRate * width * height * bytesPerPixel)
    / subSamplingDivider / (1024 * 1024);
  return dataRate.toFixed(2);
};
