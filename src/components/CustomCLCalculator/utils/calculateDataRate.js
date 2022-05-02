import { FORMAT_BITS } from '../constants';

export default ({
  mode,
  format,
  width,
  height,
  frameRate,
}) => {
  const dvrMultiplier = mode ? 1.01 : 1.0;
  const bytesPerPixel = FORMAT_BITS[format] / 8;
  const dataRate = (dvrMultiplier * width * height * frameRate * bytesPerPixel) / (1024 * 1024);
  return dataRate.toFixed(2);
};
