export default ({
  mode,
  bitDepth,
  width,
  height,
  subSampling,
  frameRate,
}) => {
  const dvrMultiplier = mode ? 1.01 : 1.0;
  const bytesPerPixel = bitDepth / 8;
  const subSamplingDivider = subSampling ? 4 : 1;
  const dataRate = (dvrMultiplier * frameRate * width * height * bytesPerPixel)
    / subSamplingDivider / (1024 * 1024);
  return dataRate.toFixed(2);
};
