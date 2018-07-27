import { OPTION } from '../constants';

export default ({
  width,
  height,
  option,
  frameRate,
}) => {
  const interlacedDivider = (option === OPTION.FIELD_MODE) ? 1 : 2;
  const dataRate = (width * height * frameRate) / (1024 * 1024) / interlacedDivider;
  return dataRate.toFixed(2);
};
