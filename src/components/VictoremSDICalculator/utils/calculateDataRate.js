import { COLOR } from '../constants';

export default (frameRate, width, height, color) => {
  let pixelSize;
  if (color === COLOR.YCbCr) pixelSize = 20;
  else if (color === COLOR.RGB) pixelSize = 30;
  const dataRate = (frameRate * width * height * pixelSize) / (1024 * 1024) / 8;
  return dataRate.toFixed(2);
};
