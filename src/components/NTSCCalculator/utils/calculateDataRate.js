import {
  COLOR,
  OPTION,
} from '../constants';

export default ({
  color,
  width,
  height,
  option,
  frameRate,
}) => {
  const bytesPerPixel = (color === COLOR.COLOR) ? 8 : 8;
  const optionDivide = (option === OPTION.FIELD_MODE) ? 1 : 2;
  const dataRate = (bytesPerPixel * width * height * frameRate) / (1024 * 1024) / 8 / optionDivide;
  return dataRate.toFixed(2);
};
