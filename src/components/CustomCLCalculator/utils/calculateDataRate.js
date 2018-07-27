import { FORMAT_BITS } from '../constants';

export default ({
  format,
  width,
  height,
  frameRate,
}) => {
  const bytesPerPixel = FORMAT_BITS[format] / 8;
  const dataRate = (1.01 * width * height * frameRate * bytesPerPixel) / (1024 * 1024);
  return dataRate.toFixed(2);
};
