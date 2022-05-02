import {
  MODELS,
  SUBSAMPLING_BINNING,
} from '../constants';

const isConfiguration = (
  linkSpeed,
  linkCount,
  targetLinkSpeed,
  targetLinkCount,
) => (linkSpeed === targetLinkSpeed) && (linkCount === targetLinkCount);

const isGpixel = model => MODELS.TYPE_3265.includes(model);
const isONSC = model => MODELS.TYPE_45000.includes(model);
const isAMS = model => MODELS.TYPE_12000.includes(model);

const calculateGPixelFrameRate = (
  model,
  width,
  maxWidth,
  height,
  adcBitDepth,
  outputBitDepth,
  linkSpeed,
  linkCount,
  subSamplingBinning,
) => {
  // Get fixed-point line length scaling factor. FPGA doesn't support floating point.
  let lineLenScalingFactor;
  if (adcBitDepth === 10) {
    if (isConfiguration(linkSpeed, linkCount, 12, 4)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.019058227539063;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.023818969726563;
    } else if (isConfiguration(linkSpeed, linkCount, 12, 2) || isConfiguration(linkSpeed, linkCount, 6, 4)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.038131713867188;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.047653198242188;
    } else if (isConfiguration(linkSpeed, linkCount, 12, 1)
      || isConfiguration(linkSpeed, linkCount, 6, 2)
      || isConfiguration(linkSpeed, linkCount, 3, 4)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.076263427734375;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.095321655273438;
    } else if (isConfiguration(linkSpeed, linkCount, 6, 1) || isConfiguration(linkSpeed, linkCount, 3, 2)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.15252685546875;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.190658569335938;
    } else if (isConfiguration(linkSpeed, linkCount, 3, 1)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.3050537109375;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.381317138671875;
    } else if (isConfiguration(linkSpeed, linkCount, 10, 4)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.026031494140625;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.032546997070313;
    } else if (isConfiguration(linkSpeed, linkCount, 10, 2) || isConfiguration(linkSpeed, linkCount, 5, 4)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.052078247070313;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.065093994140625;
    } else if (isConfiguration(linkSpeed, linkCount, 10, 1) || isConfiguration(linkSpeed, linkCount, 5, 2)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.104156494140625;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.130203247070313;
    } else if (isConfiguration(linkSpeed, linkCount, 5, 1)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.208328247070312;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.260406494140625;
    }
  } else if (adcBitDepth === 12) {
    if (isConfiguration(linkSpeed, linkCount, 12, 4)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.008468627929688;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.010589599609375;
      if (outputBitDepth === 12) lineLenScalingFactor = 0.012710571289063;
    } else if (isConfiguration(linkSpeed, linkCount, 12, 2) || isConfiguration(linkSpeed, linkCount, 6, 4)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.016952514648438;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.02117919921875;
      if (outputBitDepth === 12) lineLenScalingFactor = 0.025421142578125;
    } else if (isConfiguration(linkSpeed, linkCount, 12, 1)
      || isConfiguration(linkSpeed, linkCount, 6, 2)
      || isConfiguration(linkSpeed, linkCount, 3, 4)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.033905029296875;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.042373657226563;
      if (outputBitDepth === 12) lineLenScalingFactor = 0.050857543945313;
    } else if (isConfiguration(linkSpeed, linkCount, 6, 1) || isConfiguration(linkSpeed, linkCount, 3, 2)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.06781005859375;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.084762573242188;
      if (outputBitDepth === 12) lineLenScalingFactor = 0.101715087890625;
    } else if (isConfiguration(linkSpeed, linkCount, 3, 1)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.135635375976563;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.169540405273438;
      if (outputBitDepth === 12) lineLenScalingFactor = 0.203445434570312;
    } else if (isConfiguration(linkSpeed, linkCount, 10, 4)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.011566162109375;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.01446533203125;
      if (outputBitDepth === 12) lineLenScalingFactor = 0.017364501953125;
    } else if (isConfiguration(linkSpeed, linkCount, 10, 2) || isConfiguration(linkSpeed, linkCount, 5, 4)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.023147583007813;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.028945922851563;
      if (outputBitDepth === 12) lineLenScalingFactor = 0.03472900390625;
    } else if (isConfiguration(linkSpeed, linkCount, 10, 1) || isConfiguration(linkSpeed, linkCount, 5, 2)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.046310424804688;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.057891845703125;
      if (outputBitDepth === 12) lineLenScalingFactor = 0.069473266601563;
    } else if (isConfiguration(linkSpeed, linkCount, 5, 1)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.092620849609375;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.11578369140625;
      if (outputBitDepth === 12) lineLenScalingFactor = 0.138946533203125;
    }
  }

  // Adjust height or width to account for subsampling/binning.
  const subSampling = subSamplingBinning === SUBSAMPLING_BINNING.SUBSAMPLING;
  const binv = subSamplingBinning === SUBSAMPLING_BINNING.BIN_VERTICAL;
  const bin2 = subSamplingBinning === SUBSAMPLING_BINNING.BIN_2X2;
  const binh = subSamplingBinning === SUBSAMPLING_BINNING.BIN_HORIZONTAL;

  let sWidth = width;
  if (subSampling || binh || bin2) {
    sWidth = width / 2;
  }

  // Calculate line length.
  const lineLengthMod = 4;
  const lineLengthMin = 180;
  let lineLength = lineLengthMod * Math.ceil(Math.ceil(sWidth * lineLenScalingFactor) / lineLengthMod);
  if (lineLength < lineLengthMin) {
    lineLength = lineLengthMin;
  }

  let numChannels;
  if (adcBitDepth === 10) numChannels = 56;
  if (adcBitDepth === 12) numChannels = 28;

  let clkPixMhz;
  if (adcBitDepth === 10) clkPixMhz = 90;
  if (adcBitDepth === 12) clkPixMhz = 80;

  // Calculate line time.
  const lineTimeUs = 56 / numChannels * lineLength * (1 / clkPixMhz);
  const fotUs = 6 * lineLength * (1 / clkPixMhz);

  // Calculate and return frame rate.
  const readoutOverhead = 28;
  const frameRate = 1 / (((height + readoutOverhead) * lineTimeUs) + fotUs) * 1000000;

  return frameRate;
};

const calculateONSCFrameRate = (
  model,
  width,
  maxWidth,
  height,
  adcBitDepth,
  outputBitDepth,
  linkSpeed,
  linkCount,
  dualGain,
  subSamplingBinning,
) => {
  // Get fixed-point line length scaling factor. FPGA doesn't support floating point.
  let lineLenScalingFactor;
  if (adcBitDepth === 10) {
    if (isConfiguration(linkSpeed, linkCount, 12, 4)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.013717651367188;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.01715087890625;
    } else if (isConfiguration(linkSpeed, linkCount, 12, 2) || isConfiguration(linkSpeed, linkCount, 6, 4)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.027450561523438;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.034317016601563;
    } else if (isConfiguration(linkSpeed, linkCount, 12, 1)
      || isConfiguration(linkSpeed, linkCount, 6, 2)
      || isConfiguration(linkSpeed, linkCount, 3, 4)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.054916381835938;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.068649291992188;
    } else if (isConfiguration(linkSpeed, linkCount, 6, 1) || isConfiguration(linkSpeed, linkCount, 3, 2)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.109848022460938;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.137313842773438;
    } else if (isConfiguration(linkSpeed, linkCount, 3, 1)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.219696044921875;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.274627685546875;
    } else if (isConfiguration(linkSpeed, linkCount, 10, 4)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.018753051757813;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.0234375;
    } else if (isConfiguration(linkSpeed, linkCount, 10, 2) || isConfiguration(linkSpeed, linkCount, 5, 4)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.037506103515625;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.046875;
    } else if (isConfiguration(linkSpeed, linkCount, 10, 1) || isConfiguration(linkSpeed, linkCount, 5, 2)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.07501220703125;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.093765258789063;
    } else if (isConfiguration(linkSpeed, linkCount, 5, 1)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.150039672851563;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.187545776367188;
    }
  } else if (adcBitDepth === 12) {
    if (isConfiguration(linkSpeed, linkCount, 12, 4)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.01373291015625;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.017166137695313;
      if (outputBitDepth === 12) lineLenScalingFactor = 0.020599365234375;
    } else if (isConfiguration(linkSpeed, linkCount, 12, 2) || isConfiguration(linkSpeed, linkCount, 6, 4)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.0274658203125;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.034332275390625;
      if (outputBitDepth === 12) lineLenScalingFactor = 0.04119873046875;
    } else if (isConfiguration(linkSpeed, linkCount, 12, 1)
      || isConfiguration(linkSpeed, linkCount, 6, 2)
      || isConfiguration(linkSpeed, linkCount, 3, 4)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.054931640625;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.06866455078125;
      if (outputBitDepth === 12) lineLenScalingFactor = 0.0823974609375;
    } else if (isConfiguration(linkSpeed, linkCount, 6, 1) || isConfiguration(linkSpeed, linkCount, 3, 2)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.10986328125;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.1373291015625;
      if (outputBitDepth === 12) lineLenScalingFactor = 0.164794921875;
    } else if (isConfiguration(linkSpeed, linkCount, 3, 1)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.219741821289062;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.274673461914062;
      if (outputBitDepth === 12) lineLenScalingFactor = 0.329605102539062;
    } else if (isConfiguration(linkSpeed, linkCount, 10, 4)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.018753051757813;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.0234375;
      if (outputBitDepth === 12) lineLenScalingFactor = 0.02813720703125;
    } else if (isConfiguration(linkSpeed, linkCount, 10, 2) || isConfiguration(linkSpeed, linkCount, 5, 4)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.037506103515625;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.046890258789063;
      if (outputBitDepth === 12) lineLenScalingFactor = 0.0562744140625;
    } else if (isConfiguration(linkSpeed, linkCount, 10, 1) || isConfiguration(linkSpeed, linkCount, 5, 2)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.075027465820313;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.093780517578125;
      if (outputBitDepth === 12) lineLenScalingFactor = 0.112548828125;
    } else if (isConfiguration(linkSpeed, linkCount, 5, 1)) {
      if (outputBitDepth === 8) lineLenScalingFactor = 0.150054931640625;
      if (outputBitDepth === 10) lineLenScalingFactor = 0.187576293945313;
      if (outputBitDepth === 12) lineLenScalingFactor = 0.22509765625;
    }
  }

  // Adjust height or width to account for subsampling/binning.
  const subSampling = subSamplingBinning === SUBSAMPLING_BINNING.SUBSAMPLING;
  const binv = subSamplingBinning === SUBSAMPLING_BINNING.BIN_VERTICAL;
  const bin2 = subSamplingBinning === SUBSAMPLING_BINNING.BIN_2X2;
  const binh = subSamplingBinning === SUBSAMPLING_BINNING.BIN_HORIZONTAL;

  let sWidth = width;
  if (subSampling || binh || bin2) {
    sWidth = width / 2;
  }

  // Calculate line length.
  const lineLengthMod = 2;
  let lineLengthMin;
  if (adcBitDepth === 10) lineLengthMin = 226;
  if (adcBitDepth === 12) lineLengthMin = 246;

  let lineLength = lineLengthMod * Math.ceil(Math.ceil(sWidth * lineLenScalingFactor) / lineLengthMod);
  if (lineLength < lineLengthMin) {
    lineLength = lineLengthMin;
  }

  let clkPixMhz;
  if (adcBitDepth === 10) clkPixMhz = 64.8;
  if (adcBitDepth === 12) clkPixMhz = 64.8;

  // Calculate line time.
  const lineTimeUs = lineLength * (1 / clkPixMhz);
  const fotUs = 0;

  // Calculate and return frame rate.
  let sHeight = height;
  let readoutOverhead;
  if (adcBitDepth === 10) readoutOverhead = 25;
  if (adcBitDepth === 12) {
    readoutOverhead = 24;
    if (dualGain) {
      sHeight = height * 2;
      readoutOverhead = 31;
    }
  }

  const frameRate = 1 / (((sHeight + readoutOverhead) * lineTimeUs) + fotUs) * 1000000;

  return frameRate;
};

const calculateAMSFrameRate = (
  model,
  width,
  maxWidth,
  height,
  adcBitDepth,
  outputBitDepth,
  linkSpeed,
  linkCount,
  subSamplingBinning,
) => {
  // Adjust height or width to account for subsampling/binning.
  const subSampling = subSamplingBinning === SUBSAMPLING_BINNING.SUBSAMPLING;
  const binv = subSamplingBinning === SUBSAMPLING_BINNING.BIN_VERTICAL;
  const bin2 = subSamplingBinning === SUBSAMPLING_BINNING.BIN_2X2;
  const binh = subSamplingBinning === SUBSAMPLING_BINNING.BIN_HORIZONTAL;

  let sWidth = width;
  let sHeight = height;
  if (subSampling || binh || bin2) {
    sWidth = width / 2;
  } else if (binv && !isConfiguration(linkSpeed, linkCount, 12, 4)) {
    sHeight = height / 2;
  }

  // For each /2 width, increase speeds by 1 step
  let Tap64Speeds;
  let Tap32Speeds;
  let Tap16Speeds;
  let Tap8Speeds;
  let Tap4Speeds;
  if (adcBitDepth === 8) {
    Tap64Speeds = [14, 143];
    Tap32Speeds = [8, 257];
    Tap16Speeds = [4, 515];
    Tap8Speeds = [2, 1031];
    Tap4Speeds = [1, 2063];
  } else if (adcBitDepth === 10) {
    Tap64Speeds = [12, 128];
    Tap32Speeds = [6, 257];
    Tap16Speeds = [3, 515];
    Tap8Speeds = [2, 1031];
    Tap4Speeds = [1, 2063];
  } else if (adcBitDepth === 12) {
    Tap64Speeds = [7, 244];
    Tap32Speeds = [7, 257];
    Tap16Speeds = [4, 515];
    Tap8Speeds = [2, 1031];
    Tap4Speeds = [1, 2063];
  }

  let lvdsClock;
  let reg82;
  let reg85;
  if (isConfiguration(linkSpeed, linkCount, 12, 4)) {
    lvdsClock = 600;
    [reg82, reg85] = Tap64Speeds;
  } else if (isConfiguration(linkSpeed, linkCount, 12, 2) || isConfiguration(linkSpeed, linkCount, 6, 4)) {
    lvdsClock = 600;
    [reg82, reg85] = Tap32Speeds;
    if (sWidth <= (maxWidth / 2)) [reg82, reg85] = Tap64Speeds;
  } else if (isConfiguration(linkSpeed, linkCount, 12, 1)
    || isConfiguration(linkSpeed, linkCount, 6, 2)
    || isConfiguration(linkSpeed, linkCount, 3, 4)) {
    lvdsClock = 600;
    [reg82, reg85] = Tap16Speeds;
    if (sWidth <= (maxWidth / 2)) [reg82, reg85] = Tap32Speeds;
    if (sWidth <= (maxWidth / 4)) [reg82, reg85] = Tap64Speeds;
  } else if (isConfiguration(linkSpeed, linkCount, 6, 1) || isConfiguration(linkSpeed, linkCount, 3, 2)) {
    lvdsClock = 600;
    [reg82, reg85] = Tap8Speeds;
    if (sWidth <= (maxWidth / 2)) [reg82, reg85] = Tap16Speeds;
    if (sWidth <= (maxWidth / 4)) [reg82, reg85] = Tap32Speeds;
    if (sWidth <= (maxWidth / 8)) [reg82, reg85] = Tap64Speeds;
  } else if (isConfiguration(linkSpeed, linkCount, 3, 1)) {
    lvdsClock = 600;
    [reg82, reg85] = Tap4Speeds;
    if (sWidth <= (maxWidth / 2)) [reg82, reg85] = Tap8Speeds;
    if (sWidth <= (maxWidth / 4)) [reg82, reg85] = Tap16Speeds;
    if (sWidth <= (maxWidth / 8)) [reg82, reg85] = Tap32Speeds;
    if (sWidth <= (maxWidth / 16)) [reg82, reg85] = Tap64Speeds;
  } else if (isConfiguration(linkSpeed, linkCount, 10, 4)) {
    lvdsClock = 425;
    if (adcBitDepth === 12) lvdsClock = 600;
    [reg82, reg85] = Tap64Speeds;
  } else if (isConfiguration(linkSpeed, linkCount, 10, 2) || isConfiguration(linkSpeed, linkCount, 5, 4)) {
    lvdsClock = 425;
    [reg82, reg85] = Tap32Speeds;
    if (sWidth <= (maxWidth / 2)) [reg82, reg85] = Tap64Speeds;
  } else if (isConfiguration(linkSpeed, linkCount, 10, 1) || isConfiguration(linkSpeed, linkCount, 5, 2)) {
    lvdsClock = 425;
    [reg82, reg85] = Tap16Speeds;
    if (sWidth <= (maxWidth / 2)) [reg82, reg85] = Tap32Speeds;
    if (sWidth <= (maxWidth / 4)) [reg82, reg85] = Tap64Speeds;
  } else if (isConfiguration(linkSpeed, linkCount, 5, 1)) {
    lvdsClock = 425;
    [reg82, reg85] = Tap8Speeds;
    if (sWidth <= (maxWidth / 2)) [reg82, reg85] = Tap16Speeds;
    if (sWidth <= (maxWidth / 4)) [reg82, reg85] = Tap32Speeds;
    if (sWidth <= (maxWidth / 8)) [reg82, reg85] = Tap64Speeds;
  }

  // Calculate line time.
  const lineTimeUs = (reg85 + 1) * (adcBitDepth / lvdsClock);
  const fotUs = Math.ceil((reg82 + 2) * lineTimeUs);

  // Calculate and return frame rate.
  const framePeriod = Math.ceil((sHeight / 2 * lineTimeUs) + fotUs);
  const frameRate = 1 / framePeriod * 1000000;

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
  dualGain,
  subSamplingBinning,
}) => {
  const trailingNumbers = format.match(/\d+$/);
  const linkSpeed = Number(trailingNumbers[0]);
  const linkCount = Number(format.slice(0, 1));
  if (isGpixel(model)) {
    return calculateGPixelFrameRate(
      model,
      width,
      maxWidth,
      height,
      adcBitDepth,
      outputBitDepth,
      linkSpeed,
      linkCount,
      subSamplingBinning,
    );
  }

  if (isONSC(model)) {
    return calculateONSCFrameRate(
      model,
      width,
      maxWidth,
      height,
      adcBitDepth,
      outputBitDepth,
      linkSpeed,
      linkCount,
      dualGain,
      subSamplingBinning,
    );
  }

  if (isAMS(model)) {
    return calculateAMSFrameRate(
      model,
      width,
      maxWidth,
      height,
      adcBitDepth,
      outputBitDepth,
      linkSpeed,
      linkCount,
      subSamplingBinning,
    );
  }

  return 'N/A';
};
