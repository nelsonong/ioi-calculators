import { FORMAT_BITS } from '../constants';

export default ({
  format,
  frameRate,
  width,
  height,
}) => {
  const bytesPerPixel = FORMAT_BITS[format] / 8;
  const dataRate = (1.01 * frameRate * width * height * bytesPerPixel) / (1024 * 1024);
  return dataRate.toFixed(2);
};
