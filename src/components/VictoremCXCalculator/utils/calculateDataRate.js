export default ({
  outputBitDepth,
  widthOutput,
  heightOutput,
  frameRate,
}) => {
  const bytesPerPixel = outputBitDepth / 8;
  const dataRate = (widthOutput * heightOutput * frameRate * bytesPerPixel) / (1024 * 1024);

  return dataRate.toFixed(2);
};
