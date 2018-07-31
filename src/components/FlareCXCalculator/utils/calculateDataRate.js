export default ({
  bitDepth,
  width,
  height,
  subSampling,
  frameRate,
}) => {
  const bytesPerPixel = bitDepth / 8;
  const subSamplingDivider = subSampling ? 4 : 1;
  const dataRate = (1.01 * frameRate * width * height * bytesPerPixel)
    / subSamplingDivider / (1024 * 1024);
  return dataRate.toFixed(2);
};
