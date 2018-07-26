export default ({
  bitDepth,
  width,
  height,
  frameRate,
}) => {
  const dataRate = (bitDepth * width * height * frameRate) / (1024 * 1024) / 8;
  return dataRate.toFixed(2);
};