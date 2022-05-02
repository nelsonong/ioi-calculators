import { COLOR } from '../constants';

export default ({
  mode,
  width,
  height,
  color,
  frameRate,
}) => {
  const dvrMultiplier = mode ? 1.01 : 1.0;

  let bytesPerPixel;
  if (color === COLOR.YCbCr) {
    bytesPerPixel = 2.5;
  } else if (color === COLOR.RGB) {
    bytesPerPixel = 5;
  }

  const packedWidth = Math.ceil(width * bytesPerPixel / 2048) * 2048;
  const pixels = packedWidth * height;
  const dataRate = (dvrMultiplier * pixels * frameRate) / (1024 * 1024);
  return dataRate.toFixed(2);
};
