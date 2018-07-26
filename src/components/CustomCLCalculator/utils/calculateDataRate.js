import { FORMAT_BITS } from '../constants';

export default ({
  format,
  width,
  height,
  frameRate,
}) => {
  const bitsPerPixel = FORMAT_BITS[format];
  const dataRate = (bitsPerPixel * width * height * frameRate) / (1024 * 1024) / 8;
  return dataRate.toFixed(2);
};
