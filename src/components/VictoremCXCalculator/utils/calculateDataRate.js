export default ({
  adcBitDepth,
  width,
  height,
  frameRate,
}) => {
  const bytesPerPixel = adcBitDepth / 8;
  const dataRate = (1.01 * width * height * frameRate * bytesPerPixel) / (1024 * 1024);
  return dataRate.toFixed(2);
};
