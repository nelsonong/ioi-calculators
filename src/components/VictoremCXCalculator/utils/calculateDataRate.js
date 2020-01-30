export default ({
  outputBitDepth,
  width,
  height,
  frameRate,
}) => {
  const bytesPerPixel = outputBitDepth / 8;
  const dataRate = (width * height * frameRate * bytesPerPixel) / (1024 * 1024);

  return dataRate.toFixed(2);
};
