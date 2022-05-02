export default ({
  outputBitDepth,
  widthOutput,
  heightOutput,
  frameRate,
}) => {
  const bytesPerPixel = outputBitDepth / 8;
  const dataRate = (widthOutput * heightOutput * bytesPerPixel * frameRate) / (1024 * 1024);

  return { dataRate };
};
