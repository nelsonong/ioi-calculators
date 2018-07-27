export default ({
  width,
  height,
  frameRate,
}) => {
  const interlacedDivider = 2;
  const dataRate = (width * height * frameRate) / (1024 * 1024) / interlacedDivider;
  return dataRate.toFixed(2);
};
