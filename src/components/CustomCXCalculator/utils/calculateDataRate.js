export default ({
  mode,
  bitDepth,
  width,
  height,
  frameRateOutput,
}) => {
  const dvrMultiplier = mode ? 1.01 : 1.0;
  const bitDepthValue = Number(bitDepth.match(/\d+/)[0]);
  const bytesPerPixel = bitDepthValue === 14
    ? Math.ceil(bitDepthValue / 8)
    : bitDepthValue / 8;
  const dataRate = (dvrMultiplier * width * height * frameRateOutput * bytesPerPixel) / (1024 * 1024);
  return dataRate.toFixed(2);
};
