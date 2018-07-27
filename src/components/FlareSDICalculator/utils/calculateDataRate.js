import { COLOR } from '../constants';

export default (frameRate, width, height, interlaced, color) => {
  let bytesPerPixel;
  if (color === COLOR.YCbCr) {
    bytesPerPixel = 2.5;
  } else if (color === COLOR.RGB) {
    bytesPerPixel = 5;
  }

  const interlacedDivider = interlaced ? 2 : 1;
  const packedWidth = Math.ceil(width * bytesPerPixel / 2048) * 2048;
  const pixels = packedWidth * height / interlacedDivider;
  const dataRate = (1.01 * pixels * frameRate) / (1024 * 1024);
  return dataRate.toFixed(2);
};
