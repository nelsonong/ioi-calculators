import {
  MODELS,
  SENSOR_DRIVE_MODE,
} from '../constants';

const isConfiguration = (
  linkSpeed,
  linkCount,
  targetLinkSpeed,
  targetLinkCount,
) => (linkSpeed === targetLinkSpeed) && (linkCount === targetLinkCount);

const calculateDriveModeFrameRate = (height, adcBitDepth, linkSpeed, linkCount, sensorDriveMode) => {
  // Determine hmaxMin (the minimum possible value of hmax)
  let hmaxCalc;
  if (sensorDriveMode === SENSOR_DRIVE_MODE.ALL_12) hmaxCalc = 861;
  else if (sensorDriveMode === SENSOR_DRIVE_MODE.ALL_10) hmaxCalc = 720;
  else {
    throw new Error(`Unsupported sensor drive mode '${sensorDriveMode}'.`);
  }

  // Determine vmax
  let vmax;
  if (sensorDriveMode === SENSOR_DRIVE_MODE.ALL_12) vmax = 3728;
  else if (sensorDriveMode === SENSOR_DRIVE_MODE.ALL_10) vmax = 3728;
  else {
    throw new Error(`Unsupported sensor drive mode '${sensorDriveMode}'.`);
  }

  // Determine clock frequencye
  const clkMHz = 72;

  // Calculate the frame rate
  let frameRate;
  // Mode 0
  if (sensorDriveMode === SENSOR_DRIVE_MODE.ALL_12) {
    frameRate = 1 / ((hmaxCalc / clkMHz) * vmax / 1000000.0);
  // Mode 1
  } else if (sensorDriveMode === SENSOR_DRIVE_MODE.ALL_10) {
    const minVr = Math.max(height, 1826); // VR only affects frame rate between 1826 and 3672 lines
    const minVertBlank = 56;
    if (adcBitDepth === 12) {
      throw new Error(`Unsupported bit depth '${adcBitDepth}'.`);
    }
    frameRate = 1 / ((hmaxCalc / clkMHz) * (minVr + minVertBlank) / 1000000.0);
  } else {
    throw new Error(`Unsupported sensor drive mode '${sensorDriveMode}'.`);
  }

  return frameRate;
};

const calculateFrameRate = (
  model,
  width,
  maxWidth,
  height,
  adcBitDepth,
  outputBitDepth,
  linkSpeed,
  linkCount,
) => {
  let hmaxMod;
  if (adcBitDepth === 8) hmaxMod = 1;
  else if (adcBitDepth === 10) hmaxMod = 5;
  else if (adcBitDepth === 12) hmaxMod = 3;
  else throw new Error(`Unsupported bit depth '${adcBitDepth}'.`);

  let CXPClock; // ns
  if (linkSpeed === 6) CXPClock = 6.4;
  else if (linkSpeed === 5) CXPClock = 8;
  else if (linkSpeed === 3) CXPClock = 12.8;
  else if (linkSpeed === 2) CXPClock = 16;
  else throw new Error(`Unsupported CXP linkSpeed '${linkSpeed}'.`);

  const CLK_DDR = 297;

  const SixteenPixelTime = adcBitDepth * (1 / (2 * CLK_DDR)) * 1000; // 16-Pixel Time
  const SixteenPixelTimeOut = CXPClock * (16.0 / (32.0 / adcBitDepth));
  const SixteenPixelTimeRatio = SixteenPixelTimeOut / SixteenPixelTime;
  const FixedPoint = Math.floor((SixteenPixelTimeRatio - SixteenPixelTimeRatio) * 65536) / 65536
    + SixteenPixelTimeRatio;

  const hmax = 0;
  let hmaxCalc = 0;
  let minVertBlank = 0;
  if (MODELS.TYPE_174.includes(model)) {
    if (adcBitDepth === 8) {
      throw new Error(`Unsupported bit depth '${adcBitDepth}'.`);
    }

    minVertBlank = 38;

    hmaxCalc = adcBitDepth === 10 ? 360 : 462;
  } else if (MODELS.TYPE_250.includes(model)) {
    minVertBlank = 38;

    if (adcBitDepth === 12) hmaxCalc = 396;
    else if (adcBitDepth === 10) hmaxCalc = 245;
    else hmaxCalc = 217; // 8-Bit
  } else if (MODELS.TYPE_252.includes(model)) {
    minVertBlank = 38;

    if (adcBitDepth === 12) hmaxCalc = 396;
    else if (adcBitDepth === 10) hmaxCalc = 245;
    else hmaxCalc = 217; // 8-Bit
  } else if (MODELS.TYPE_253.includes(model)) {
    minVertBlank = 54;

    if (adcBitDepth === 12) hmaxCalc = 522;
    else if (adcBitDepth === 10) hmaxCalc = 375;
    else hmaxCalc = 355; // 8-Bit
  } else if (MODELS.TYPE_255.includes(model)) {
    minVertBlank = 54;

    if (adcBitDepth === 12) hmaxCalc = 522;
    else if (adcBitDepth === 10) hmaxCalc = 375;
    else hmaxCalc = 355; // 8-Bit
  } else if (MODELS.TYPE_265.includes(model)) {
    minVertBlank = 32;
    hmaxCalc = 846;
  } else if (MODELS.TYPE_305.includes(model)) {
    minVertBlank = 54;
    hmaxCalc = 522;
  } else if (MODELS.TYPE_505.includes(model)) {
    minVertBlank = 14;

    if (adcBitDepth === 12) hmaxCalc = 528;
    else if (adcBitDepth === 10) hmaxCalc = 444;
    else hmaxCalc = 372; // 8-Bit
  } else {
    throw new Error('Unsupported model');
  }

  if (hmax > 0) {
    if ((hmaxMod * Math.ceil((Math.ceil((hmax - (((maxWidth - width) / 16)
      * FixedPoint)))) / hmaxMod) > hmaxCalc)) {
      hmaxCalc = hmaxMod * Math.ceil((Math.ceil((hmax - (((maxWidth - width) / 16) * FixedPoint)))) / hmaxMod);
    }
  }

  // Calculate the frame rate
  let linetime;
  if (outputBitDepth < adcBitDepth && !isConfiguration(linkSpeed, linkCount, 6, 2)) {
    let adcBitRatio = 0;
    if (outputBitDepth === 8 && adcBitDepth === 12) adcBitRatio = 0.66667;
    if (outputBitDepth === 8 && adcBitDepth === 10) adcBitRatio = 0.8;
    if (outputBitDepth === 10 && adcBitDepth === 12) adcBitRatio = 0.83334;
    const factor = hmaxMod * Math.ceil((hmaxCalc * adcBitRatio) / hmaxMod);
    linetime = Math.max(factor, hmaxCalc) / 74.25;
  } else if (MODELS.TYPE_505.includes(model)) {
    linetime = hmaxCalc / 80;
  } else {
    linetime = hmaxCalc / 74.25;
  }

  let frameRate;
  if (MODELS.TYPE_505.includes(model)) {
    const readoutTimeRounded = Math.ceil((height + minVertBlank) * linetime);
    const fotRounded = Math.ceil(4 * hmaxCalc / 80);
    const frameTime = fotRounded + readoutTimeRounded;

    frameRate = 1 / frameTime * 1000000;
  } else {
    frameRate = 1 / (linetime * (height + minVertBlank) / 1000000);
  }

  return frameRate;
};

export default ({
  model,
  format,
  adcBitDepth,
  outputBitDepth,
  width,
  maxWidth,
  height,
  sensorDriveMode,
}) => {
  const linkSpeed = Number(format.slice(-1));
  const linkCount = Number(format.slice(0, 1));
  let frameRate;
  if (MODELS.TYPE_183.includes(model)) {
    frameRate = calculateDriveModeFrameRate(
      height,
      adcBitDepth,
      linkSpeed,
      linkCount,
      sensorDriveMode,
    );
  } else {
    frameRate = calculateFrameRate(
      model,
      width,
      maxWidth,
      height,
      adcBitDepth,
      outputBitDepth,
      linkSpeed,
      linkCount,
    );
  }

  return frameRate;
};
