export default ({
  bitDepth,
  width,
  height,
  frameRate,
}) => {
  const bitsPerPixel = bitDepth / 8;
  const dataRate = (width * height * frameRate * bitsPerPixel) / (1024 * 1024);
  return dataRate.toFixed(2);
};
