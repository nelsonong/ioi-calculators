export default ({
  bitDepth,
  linkCount,
  width,
  height,
  frameRate,
}) => {
  const dataRate = (bitDepth * linkCount * width * height * frameRate) / (1024 * 1024) / 8;
  return dataRate.toFixed(2);
};
